import {Module} from '@nestjs/common';
import {MessagingGatewayProvider} from './messaging-gateway.provider';

@Module({
  providers: [MessagingGatewayProvider],
})
export class MessagingGatewayModule {}
