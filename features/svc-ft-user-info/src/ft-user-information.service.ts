import {LoggerService} from '@envy/lib-api';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {
  AuthenticationSuccessOutgoingPacket,
  AvailabilityStatusOutgoingPacket,
  HabboBroadcastOutgoingPacket,
  NavigatorSettingsOutgoingPacket,
} from '@envy/lib-packets';
import {
  MessagingGatewayClientService,
  ProfileClientService,
} from '@envy/lib-client';

@Injectable()
export class FtUserInformationService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly profileClientService: ProfileClientService,
    private readonly messagingGatewayClientService: MessagingGatewayClientService
  ) {}

  async onSecureLogin(clientID: string, ssoTicket?: string): Promise<void> {
    this.loggerService.log(
      `Processing Information for client ${clientID} and sso ${ssoTicket}`
    );

    if (!ssoTicket) {
      this.loggerService.error('Failed to process Information.  No sso found');
      throw new UnauthorizedException();
    }

    // TODO: add sso ticket filter
    const matchingProfile = await this.profileClientService.findOne({});

    if (!matchingProfile) {
      await this.loggerService.error(
        'Failed to process Information.  No profile found'
      );
      throw new UnauthorizedException();
    }

    this.loggerService.log(
      `Found matching user #${matchingProfile.id} ${matchingProfile.username}`
    );

    await this.messagingGatewayClientService.sendMessage({
      clientID,
      buffer: new AuthenticationSuccessOutgoingPacket({}).toBuffer(),
    });

    await this.messagingGatewayClientService.sendMessage({
      clientID,
      buffer: new NavigatorSettingsOutgoingPacket({
        homeRoomID: 0,
        enterRoomID: 0,
      }).toBuffer(),
    });

    await this.messagingGatewayClientService.sendMessage({
      clientID,
      buffer: new AvailabilityStatusOutgoingPacket({}).toBuffer(),
    });

    await this.messagingGatewayClientService.sendMessage({
      clientID,
      buffer: new HabboBroadcastOutgoingPacket({
        message: 'Envy is a next generation habbo server',
      }).toBuffer(),
    });
  }
}
