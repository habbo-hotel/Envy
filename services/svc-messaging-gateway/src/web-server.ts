import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import {WebSocketAdapter} from './websocket.adapter';
import {SVC_MESSAGING_GATEWAY_PORT} from '@envy/lib-client';
import {MessagingGatewayModule} from './messaging-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagingGatewayModule);
  app.useWebSocketAdapter(new WebSocketAdapter(app));
  await app.listen(SVC_MESSAGING_GATEWAY_PORT);
}

bootstrap();
