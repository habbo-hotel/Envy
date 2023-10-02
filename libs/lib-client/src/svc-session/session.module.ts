import {Module} from '@nestjs/common';
import {SessionClientService} from './session-client.service';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {SVC_SESSION_NAME} from './session.const';
import {NATS_ADDRESS} from '../constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SVC_SESSION_NAME,
        transport: Transport.NATS,
        options: {
          servers: [NATS_ADDRESS],
        },
      },
    ]),
  ],
  providers: [SessionClientService],
  exports: [SessionClientService],
})
export class SessionClientModule {}
