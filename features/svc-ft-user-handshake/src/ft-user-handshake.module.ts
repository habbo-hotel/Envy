import {Module} from '@nestjs/common';
import {MessagingGatewayClientModule} from '@envy/lib-client';
import {FtUserHandshakeListener} from './ft-user-handshake.listener';

@Module({
  imports: [MessagingGatewayClientModule],
  providers: [FtUserHandshakeListener],
})
export class FtUserHandshakeModule {}
