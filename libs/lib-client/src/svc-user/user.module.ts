import {Module} from '@nestjs/common';
import {UserClientService} from './user-client.service';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {SVC_USER_NAME} from './user.const';
import {NATS_ADDRESS} from '../constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SVC_USER_NAME,
        transport: Transport.NATS,
        options: {
          servers: [NATS_ADDRESS],
        },
      },
    ]),
  ],
  providers: [UserClientService],
  exports: [UserClientService],
})
export class UserClientModule {}
