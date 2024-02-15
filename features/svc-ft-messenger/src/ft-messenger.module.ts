import {Module} from '@nestjs/common';
import {CommonModule} from '@envy/lib-api';
import {FtMessengerInformationService} from './ft-messenger.service';
import {FtMessengerInformationListener} from './ft-messenger.listener';
import {
  MessagingGatewayClientModule,
  ProfileClientModule,
} from '@envy/lib-client';

@Module({
  imports: [MessagingGatewayClientModule, ProfileClientModule, CommonModule],
  controllers: [FtMessengerInformationListener],
  providers: [FtMessengerInformationService],
  exports: [FtMessengerInformationService],
})
export class FtMessengerInformationModule {}
