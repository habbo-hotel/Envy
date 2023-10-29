import {
  MessagingExternalEvent,
  MessagingGatewayClientService,
  UserClientService,
} from '@envy/lib-client';
import {Injectable, UnauthorizedException} from '@nestjs/common';

@Injectable()
export class FtUserHandshakeService {
  constructor(
    private readonly userClientService: UserClientService,
    private readonly messagingGatewayClientService: MessagingGatewayClientService
  ) {}

  async onSecureLogin(clientID?: number, ssoTicket?: string): Promise<void> {
    console.log('processing handshake: ', clientID, ssoTicket);
    if (!ssoTicket) {
      throw new UnauthorizedException();
    }

    const matchingUser = await this.userClientService.findOne({ssoTicket});

    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.USER_HOME_ROOM,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.USER_EFFECTS_LIST,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.USER_CLOTHES,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.NEW_USER_IDENTITY,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.USER_PERMISSIONS,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.AVAILABILITY_STATUS,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.PING_COMPOSER,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.ENABLE_NOTIFICATIONS,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.USER_ACHIEVEMENT_SCORE,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.IS_FIRST_LOGIN_OF_DAY,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.MYSTERY_BOX_KEYS,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.BUILDERS_CLUB_EXPIRED,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.CFH_TOPICS_MESSAGE,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.CFH_TOPICS_MESSAGE,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.FAVORITE_ROOMS_COUNT,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.GAMES_CENTER_GAME_LIST,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.GAME_CENTER_ACCOUNT_INFO,
      data: '',
    });
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      event: MessagingExternalEvent.USER_CLUB,
      data: '',
    });
  }
}
