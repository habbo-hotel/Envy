import {Controller} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {LoggerService} from '@envy/lib-api';
import {MessagingGatewayProvider} from './messaging-gateway.provider';
import {
  MessagingExternalEvent,
  MessagingGatewayBroadcastMessageEventRequest,
  MessagingGatewayBroadcastMessageEventResponse,
  MessagingGatewayMessageReceivedEvent,
  MessagingGatewaySendMessageEventRequest,
  MessagingGatewaySendMessageEventResponse,
  SVC_MESSAGING_GATEWAY_BROADCAST_MESSAGE,
  SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED,
  SVC_MESSAGING_GATEWAY_SEND_MESSAGE,
} from '@envy/lib-client';

@Controller()
export class MessagingGatewayController {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly messagingGatewayProvider: MessagingGatewayProvider
  ) {}

  @MessagePattern(SVC_MESSAGING_GATEWAY_BROADCAST_MESSAGE)
  async broadcastMessage<D>(
    input: MessagingGatewayBroadcastMessageEventRequest<D>
  ): Promise<MessagingGatewayBroadcastMessageEventResponse> {
    this.loggerService.log(
      `Sending message to all clients with event #${input.event} ${
        MessagingExternalEvent[input.event]
      } and data ${input.data}`
    );
    await this.messagingGatewayProvider.broadcast(input.event, input.data);
    return {
      success: true,
    };
  }

  @MessagePattern(SVC_MESSAGING_GATEWAY_SEND_MESSAGE)
  async sendMessage<D>(
    input: MessagingGatewaySendMessageEventRequest<D>
  ): Promise<MessagingGatewaySendMessageEventResponse> {
    this.loggerService.log(`Sending buffer to ${input.clientID}`);
    await this.messagingGatewayProvider.send(input.clientID, input.buffer);
    return {
      success: true,
    };
  }

  @MessagePattern(SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED)
  async onMessageReceived<D>(
    event: MessagingGatewayMessageReceivedEvent<D>
  ): Promise<MessagingGatewayMessageReceivedEvent<D>> {
    this.loggerService.log(`Message received ${event}`);
    return event;
  }
}
