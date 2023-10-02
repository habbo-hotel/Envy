import {UserClientService} from '@envy/lib-client';
import {Injectable, UnauthorizedException} from '@nestjs/common';

@Injectable()
export class FtUserHandshakeService {
  constructor(private readonly userClientService: UserClientService) {}

  async onSecureLogin(ssoTicket?: string): Promise<void> {
    if (!ssoTicket) {
      throw new UnauthorizedException();
    }
    const matchingUser = await this.userClientService.findOne({ssoTicket});
    console.log('attempting login on ', matchingUser.id);
  }
}
