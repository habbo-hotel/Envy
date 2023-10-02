import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { FtUserHandshakeModule } from './ft-user-handshake.module';

async function bootstrap() {
  const app = await NestFactory.create(FtUserHandshakeModule);
  await app.listen(process.env.PORT!);
}

bootstrap();
