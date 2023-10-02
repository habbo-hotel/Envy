import {Module} from '@nestjs/common';
import {NATS_ADDRESS} from '../constants';
import {SVC_PROFILE_NAME} from './profile.const';
import {ProfileClientService} from './profile-client.service';
import {ClientsModule, Transport} from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SVC_PROFILE_NAME,
        transport: Transport.NATS,
        options: {
          servers: [NATS_ADDRESS],
        },
      },
    ]),
  ],
  providers: [ProfileClientService],
  exports: [ProfileClientService],
})
export class ProfileClientModule {}
