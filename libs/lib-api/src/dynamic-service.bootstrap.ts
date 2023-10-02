import Express from 'express';
import BodyParser from 'body-parser';
import {NATS_ADDRESS} from './constants';
import {ExpressAdapter} from '@nestjs/platform-express';
import {NestApplication, NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';

export async function dynamicServiceBootstrap(
  name: string,
  module: any,
  port: number,
  queueGroup: string
) {
  const expressApp: Express.Express = Express();

  const app: NestApplication = await NestFactory.create(
    module,
    new ExpressAdapter(expressApp),
    {
      bodyParser: false,
    }
  );

  const rawBodyBuffer = (req: any, res: any, buf: any, encoding: any) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  };

  app.use(BodyParser.urlencoded({verify: rawBodyBuffer, extended: true}));
  app.use(BodyParser.json({verify: rawBodyBuffer}));

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://143.110.231.18:5173',
      'http://143.110.231.18:5174',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      name,
      servers: [NATS_ADDRESS],
      queue: queueGroup,
    },
  });

  await app.startAllMicroservices();

  await app.init();

  await app.listen(port);
}
