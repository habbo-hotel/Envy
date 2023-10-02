import {Module} from '@nestjs/common';
import {MessagingGatewayClientModule} from '@envy/lib-client';
import {MessagingGatewayProvider} from './messaging-gateway.provider';
import {MessagingGatewayController} from './messaging-gateway.controller';

@Module({
  imports: [MessagingGatewayClientModule],
  controllers: [MessagingGatewayController],
  providers: [MessagingGatewayProvider],
})
export class MessagingGatewayModule {}
