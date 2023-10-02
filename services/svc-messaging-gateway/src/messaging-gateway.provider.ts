import {SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';

@WebSocketGateway(2096)
export class MessagingGatewayProvider {
  @SubscribeMessage('event')
  async onEvent() {
    console.log('OKRT');
  }
}
