import { MessagingInternalEvent } from '@envy/lib-client';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(2096)
export class MessagingGatewayProvider {
  @SubscribeMessage(MessagingInternalEvent.PONG_EVENT)
  async onPong() {
    console.log('ping');
  }

  @SubscribeMessage(MessagingInternalEvent.VERSION_CHECK)
  async onVersionCheck() {
    console.log('version 1');
  }
}
