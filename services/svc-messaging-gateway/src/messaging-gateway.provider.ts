import {WebSocketGateway} from '@nestjs/websockets';

@WebSocketGateway(2096)
export class MessagingGatewayProvider {}
