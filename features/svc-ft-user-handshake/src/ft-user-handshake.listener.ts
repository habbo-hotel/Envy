import {Controller} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {FtUserHandshakeService} from './ft-user-handshake.service';
import {
  MessagingGatewayMessageReceivedEvent,
  MessagingInternalEvent,
  SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED,
} from '@envy/lib-client';

@Controller()
export class FtUserHandshakeListener {
  constructor(
    private readonly ftUserHandshakeService: FtUserHandshakeService
  ) {}

  @MessagePattern(SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED)
  onMessageReceived(message: MessagingGatewayMessageReceivedEvent<any>) {
    switch (message.event) {
      case MessagingInternalEvent.SECURE_LOGIN:
        return this.onSecureLogin(message);
      default:
        return;
    }
  }

  async onSecureLogin(message: MessagingGatewayMessageReceivedEvent<any>) {
    return this.ftUserHandshakeService.onSecureLogin(
      message.clientID,
      message.data.split('\n')[1]
    );
  }
}
