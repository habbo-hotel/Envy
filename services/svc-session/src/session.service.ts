import {addTime} from '@envy/lib-api';
import {JwtService} from '@nestjs/jwt';
import {SessionContents} from '@envy/lib-api';
import {SessionRepository} from './session.repository';
import {DEFAULT_SESSION_LENGTH} from './session.const';
import {SessionChangeProfileInput} from './session.input';
import {
  ProfileClientService,
  RoleClientService,
  UserClientService,
} from '@envy/lib-client';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class SessionService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionRepo: SessionRepository,
    private readonly userClientService: UserClientService,
    private readonly roleClientService: RoleClientService,
    private readonly profileClientService: ProfileClientService
  ) {}

  async createNewSession(
    email: string,
    password: string,
    profileID?: number
  ): Promise<SessionContents> {
    const currentTime = new Date();
    const expiresAt = addTime(currentTime, DEFAULT_SESSION_LENGTH);

    const user = await this.userClientService.findOne({email});

    if (!user) {
      throw new NotFoundException(`User ${email} does not exist`);
    }

    const matchingPassword = await this.userClientService.passwordComparison({
      id: user.id,
      password,
    });

    if (!matchingPassword.matching) {
      throw new UnauthorizedException();
    }

    const userRole = await this.roleClientService.findOne({
      id: user.roleID,
    });

    if (!userRole) {
      throw new InternalServerErrorException(
        `User Role ${user.roleID} is missing`
      );
    }

    const matchingProfiles = await this.profileClientService.findMany({
      userID: user.id,
    });

    const selectedProfileID =
      profileID ?? user?.favoriteProfileID ?? matchingProfiles?.[0]?.id;

    if (!selectedProfileID) {
      throw new BadRequestException();
    }

    const userOwnsSelectedProfile = matchingProfiles.find(
      _ => _.id === selectedProfileID
    );

    if (!userOwnsSelectedProfile) {
      throw new UnauthorizedException();
    }

    const newSession = await this.sessionRepo.create({
      userID: user.id,
      profileID: selectedProfileID,
      expiresAt,
    });

    return {
      userID: newSession.userID,
      profileID: selectedProfileID,
      sessionID: newSession.id!,
      expiresAt: +newSession.expiresAt,
      scopes: userRole.scopes,
    };
  }

  async changeSessionProfile(
    session: SessionContents,
    input: SessionChangeProfileInput
  ): Promise<SessionContents> {
    const currentTime = new Date();
    const expiresAt = addTime(currentTime, DEFAULT_SESSION_LENGTH);

    const matchingUser = await this.userClientService.findOne({
      id: session.userID,
    });

    const matchingRole = await this.roleClientService.findOne({
      id: matchingUser.roleID,
    });

    const matchingProfile = await this.profileClientService.findOne({
      id: input.profileID,
    });

    const userOwnsProfile = matchingProfile.userID === session.userID;

    if (!userOwnsProfile) {
      throw new UnauthorizedException();
    }

    await this.userClientService.userUpdateOne({
      filter: {id: matchingUser.id},
      input: {favoriteProfileID: matchingProfile.id},
    });

    const newSession = await this.sessionRepo.create({
      userID: session.userID,
      profileID: matchingProfile.id!,
      expiresAt,
    });

    return {
      sessionID: newSession.id!,
      userID: newSession.userID,
      profileID: matchingProfile.id,
      expiresAt: +newSession.expiresAt,
      scopes: matchingRole.scopes,
    };
  }

  async generateBearerToken(sessionContents: SessionContents): Promise<string> {
    return await this.jwtService.signAsync(sessionContents);
  }
}
