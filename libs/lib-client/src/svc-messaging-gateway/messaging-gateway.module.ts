import {Module} from '@nestjs/common';
import {NATS_ADDRESS} from '../constants';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {SVC_MESSAGING_GATEWAY_NAME} from './messaging-gateway.const';
import {MessagingGatewayClientService} from './messaging-gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SVC_MESSAGING_GATEWAY_NAME,
        transport: Transport.NATS,
        options: {
          servers: [NATS_ADDRESS],
        },
      },
    ]),
  ],
  providers: [MessagingGatewayClientService],
  exports: [MessagingGatewayClientService],
})
export class MessagingGatewayClientModule {}
