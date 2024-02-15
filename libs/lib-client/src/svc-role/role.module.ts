import {Module} from '@nestjs/common';
import {RoleClientService} from './role-client.service';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {SVC_ROLE_NAME} from './role.const';
import {NATS_ADDRESS} from '../constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SVC_ROLE_NAME,
        transport: Transport.NATS,
        options: {
          servers: [NATS_ADDRESS],
        },
      },
    ]),
  ],
  providers: [RoleClientService],
  exports: [RoleClientService],
})
export class RoleClientModule {}
