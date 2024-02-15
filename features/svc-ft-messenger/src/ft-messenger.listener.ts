import {Controller} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {FtMessengerInformationService} from './ft-messenger.service';
import {
  MessagingGatewayMessageReceivedEvent,
  MessagingInternalEvent,
  SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED,
} from '@envy/lib-client';

@Controller()
export class FtMessengerInformationListener {
  constructor(
    private readonly ftMessengerInformationService: FtMessengerInformationService
  ) {}

  @MessagePattern(SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED)
  onMessageReceived(message: MessagingGatewayMessageReceivedEvent<any>) {
    switch (message.event) {
      case MessagingInternalEvent.MESSENGER_INIT:
        return this.ftMessengerInformationService.onMessengerInformation(
          message.clientID
        );
      default:
    }
  }
}
