import {Module} from '@nestjs/common';
import {FtUserHandshakeService} from './ft-user-handshake.service';
import {FtUserHandshakeListener} from './ft-user-handshake.listener';
import {MessagingGatewayClientModule, UserClientModule} from '@envy/lib-client';

@Module({
  imports: [MessagingGatewayClientModule, UserClientModule],
  controllers: [FtUserHandshakeListener],
  providers: [FtUserHandshakeService],
  exports: [FtUserHandshakeService],
})
export class FtUserHandshakeModule {}
