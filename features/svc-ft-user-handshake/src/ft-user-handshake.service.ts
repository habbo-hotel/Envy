import {LoggerService} from '@envy/lib-api';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {
  MessagingExternalEvent,
  MessagingGatewayClientService,
  ProfileClientService,
} from '@envy/lib-client';

@Injectable()
export class FtUserHandshakeService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly profileClientService: ProfileClientService,
    private readonly messagingGatewayClientService: MessagingGatewayClientService
  ) {}

  async onSecureLogin(clientID: string, ssoTicket?: string): Promise<void> {
    this.loggerService.log(
      `Processing handshake for client ${clientID} and sso ${ssoTicket}`
    );

    if (!ssoTicket) {
      this.loggerService.error('Failed to process handshake.  No sso found');
      throw new UnauthorizedException();
    }

    // TODO: add sso ticket filter
    const matchingProfile = await this.profileClientService.findOne({});

    if (!matchingProfile) {
      await this.loggerService.error(
        'Failed to process handshake.  No profile found'
      );
      throw new UnauthorizedException();
    }

    this.loggerService.log(
      `Found matching user #${matchingProfile.id} ${matchingProfile.username}`
    );

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
