import {Request} from 'express';
import {JwtService} from '@nestjs/jwt';
import {SessionContents} from './session.types';
import {SessionClientService} from '@envy/lib-client';
import {getRequestFromExecutionContext} from './session.utility';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SessionIsValidGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionClientService: SessionClientService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = getRequestFromExecutionContext(context);
    const bearerToken: string | undefined = request
      ?.header('authorization')
      ?.split('Bearer ')?.[1];

    if (!bearerToken) {
      return false;
    }

    const parsedBearerToken: SessionContents | null = this.jwtService.decode(
      bearerToken
    ) as any;

    if (!parsedBearerToken) {
      return false;
    }

    const matchingSession = await this.sessionClientService.findOne({
      id: parsedBearerToken.sessionID,
    });

    if (!matchingSession) {
      throw new UnauthorizedException('Session does not exist');
    }

    // @ts-ignore
    request.session = matchingSession;

    return true;
  }
}
