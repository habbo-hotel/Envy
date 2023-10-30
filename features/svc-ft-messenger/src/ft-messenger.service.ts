import {LoggerService} from '@envy/lib-api';
import {Injectable} from '@nestjs/common';
import {MessengerInitOutgoingPacket} from '@envy/lib-packets';
import {MessagingGatewayClientService} from '@envy/lib-client';

@Injectable()
export class FtMessengerInformationService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly messagingGatewayClientService: MessagingGatewayClientService
  ) {}

  async onMessengerInformation(clientID: string): Promise<void> {
    this.loggerService.log(`Messenger init for client ${clientID}`);
    await this.messagingGatewayClientService.sendMessage({
      clientID,
      buffer: new MessengerInitOutgoingPacket({
        friendLimit: 250,
        extendedFirendsLimit: 250,
      }).toBuffer(),
    });
  }
}
