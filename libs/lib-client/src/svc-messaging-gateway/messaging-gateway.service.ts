import {lastValueFrom} from 'rxjs';
import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {
  SVC_MESSAGING_GATEWAY_BROADCAST_MESSAGE,
  SVC_MESSAGING_GATEWAY_NAME,
  SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED,
  SVC_MESSAGING_GATEWAY_SEND_MESSAGE,
} from './messaging-gateway.const';
import {
  MessagingGatewayBroadcastMessageEventRequest,
  MessagingGatewayBroadcastMessageEventResponse,
  MessagingGatewayMessageReceivedEvent,
  MessagingGatewaySendMessageEventRequest,
  MessagingGatewaySendMessageEventResponse,
} from './messaging-gateway.types';

@Injectable()
export class MessagingGatewayClientService {
  constructor(
    @Inject(SVC_MESSAGING_GATEWAY_NAME) private client: ClientProxy
  ) {}

  async broadcastMessage<D>(
    input: MessagingGatewayBroadcastMessageEventRequest<D>
  ): Promise<MessagingGatewayBroadcastMessageEventResponse> {
    const response = this.client.send(
      SVC_MESSAGING_GATEWAY_BROADCAST_MESSAGE,
      input
    );
    return await lastValueFrom(response);
  }

  async sendMessage<D>(
    input: MessagingGatewaySendMessageEventRequest<D>
  ): Promise<MessagingGatewaySendMessageEventResponse> {
    const response = this.client.send(
      SVC_MESSAGING_GATEWAY_SEND_MESSAGE,
      input
    );
    return await lastValueFrom(response);
  }

  async _onMessageReceived<D>(
    input: MessagingGatewayMessageReceivedEvent<D>
  ): Promise<void> {
    await this.client.emit(SVC_MESSAGING_GATEWAY_ON_MESSAGE_RECEIVED, input);
  }
}
