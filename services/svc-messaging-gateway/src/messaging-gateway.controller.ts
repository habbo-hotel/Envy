import {Controller} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {
  MessagingGatewayMessageReceivedEvent,
  MessagingGatewaySendMessageEventRequest,
  MessagingGatewaySendMessageEventResponse,
  SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED,
  SVC_MESSAGING_GATEWAY_SEND_MESSAGE,
} from '@envy/lib-client';

@Controller()
export class MessagingGatewayController {
  constructor() {}

  @MessagePattern(SVC_MESSAGING_GATEWAY_SEND_MESSAGE)
  async sendMessage<D>(
    input: MessagingGatewaySendMessageEventRequest<D>
  ): Promise<MessagingGatewaySendMessageEventResponse> {
    return {
      success: true,
    };
  }

  @MessagePattern(SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED)
  async onMessageReceived<D>(
    event: MessagingGatewayMessageReceivedEvent<D>
  ): Promise<MessagingGatewayMessageReceivedEvent<D>> {
    return event;
  }
}
