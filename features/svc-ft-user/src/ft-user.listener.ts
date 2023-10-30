import {Controller} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {FtUserService} from './ft-user.service';
import {
  MessagingGatewayMessageReceivedEvent,
  MessagingInternalEvent,
  SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED,
} from '@envy/lib-client';

@Controller()
export class FtUserListener {
  constructor(private readonly ftUserService: FtUserService) {}

  @MessagePattern(SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED)
  onMessageReceived(message: MessagingGatewayMessageReceivedEvent<any>) {
    switch (message.event) {
      case MessagingInternalEvent.SSO_TICKET:
        return this.onSecureLogin(message);
      case MessagingInternalEvent.INFO_RETRIEVE:
        return this.onUserInformation(message);
      case MessagingInternalEvent.GET_FRIEND_REQUESTS:
        return this.onFriendRequests(message);
      default:
        return;
    }
  }

  async onSecureLogin(message: MessagingGatewayMessageReceivedEvent<any>) {
    return this.ftUserService.onSecureLogin(
      message.clientID,
      message.data.split('\n')[1]
    );
  }

  async onUserInformation(message: MessagingGatewayMessageReceivedEvent<any>) {}

  async onFriendRequests(message: MessagingGatewayMessageReceivedEvent<any>) {}
}
