import {Controller, Injectable} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {
  MessagingGatewayMessageReceivedEvent,
  SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED,
} from '@envy/lib-client';

@Controller()
export class FtUserHandshakeListener {
  @MessagePattern(SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED)
  async onMessageReceived<D>(
    event: MessagingGatewayMessageReceivedEvent<D>
  ): Promise<MessagingGatewayMessageReceivedEvent<D>> {
    return event;
  }
}
