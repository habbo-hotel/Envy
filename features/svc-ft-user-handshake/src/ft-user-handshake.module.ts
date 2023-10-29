import {Module} from '@nestjs/common';
import {CommonModule} from '@envy/lib-api';
import {FtUserHandshakeService} from './ft-user-handshake.service';
import {FtUserHandshakeListener} from './ft-user-handshake.listener';
import {
  MessagingGatewayClientModule,
  ProfileClientModule,
} from '@envy/lib-client';

@Module({
  imports: [MessagingGatewayClientModule, ProfileClientModule, CommonModule],
  controllers: [FtUserHandshakeListener],
  providers: [FtUserHandshakeService],
  exports: [FtUserHandshakeService],
})
export class FtUserHandshakeModule {}
