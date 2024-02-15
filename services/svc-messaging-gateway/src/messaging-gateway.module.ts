import {Module} from '@nestjs/common';
import {CommonModule} from '@envy/lib-api';
import {MessagingGatewayClientModule} from '@envy/lib-client';
import {MessagingGatewayProvider} from './messaging-gateway.provider';
import {MessagingGatewayController} from './messaging-gateway.controller';

@Module({
  imports: [MessagingGatewayClientModule, CommonModule],
  controllers: [MessagingGatewayController],
  providers: [MessagingGatewayProvider],
})
export class MessagingGatewayModule {}
