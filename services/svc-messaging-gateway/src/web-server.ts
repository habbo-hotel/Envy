import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import {WebSocketAdapter} from './websocket.adapter';
import {NATS_ADDRESS} from 'libs/lib-client/src/constants';
import {MessagingGatewayModule} from './messaging-gateway.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {
  SVC_MESSAGING_GATEWAY_NAME,
  SVC_MESSAGING_GATEWAY_PORT,
} from '@envy/lib-client';
import {LoggerService} from '@envy/lib-api';

async function bootstrap() {
  const app = await NestFactory.create(MessagingGatewayModule);
  const loggerService = app.get(LoggerService);
  app.useWebSocketAdapter(new WebSocketAdapter(app, loggerService));
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      name: SVC_MESSAGING_GATEWAY_NAME,
      servers: [NATS_ADDRESS],
      queue: SVC_MESSAGING_GATEWAY_NAME,
    },
  });

  await app.startAllMicroservices();
  await app.init();
  await app.listen(SVC_MESSAGING_GATEWAY_PORT);
}

bootstrap();
