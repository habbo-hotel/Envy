import {UserRepository} from './user.repository';
import {RoleClientService} from '@envy/lib-client';
import {Injectable, UnauthorizedException} from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleClientService: RoleClientService
  ) {}

  async canAccessUser(
    authenticatedUserID: number,
    requestedUserID: number
  ): Promise<boolean> {
    if (authenticatedUserID === requestedUserID) {
      return true;
    }

    const authenticatedUser = await this.userRepo.findOneOrFail({
      where: {id: authenticatedUserID},
    });

    const authenticatedRole = await this.roleClientService.findOne({
      id: authenticatedUser.roleID,
    });

    if (authenticatedRole.scopes.bypassUserPrivacy) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
