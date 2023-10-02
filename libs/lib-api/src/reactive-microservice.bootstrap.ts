import {NATS_ADDRESS} from './constants';
import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';

export async function reactiveMicroserviceBootstrap(
  module: any,
  queueGroup: string
) {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    module,
    {
      transport: Transport.NATS,
      options: {
        servers: [NATS_ADDRESS],
        queue: queueGroup,
      },
    }
  );

  await app.init();
  await app.listen();
}
