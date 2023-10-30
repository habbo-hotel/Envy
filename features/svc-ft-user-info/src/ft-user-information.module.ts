import {Module} from '@nestjs/common';
import {CommonModule} from '@envy/lib-api';
import {FtUserInformationService} from './ft-user-Information.service';
import {FtUserInformationListener} from './ft-user-information.listener';
import {
  MessagingGatewayClientModule,
  ProfileClientModule,
} from '@envy/lib-client';

@Module({
  imports: [MessagingGatewayClientModule, ProfileClientModule, CommonModule],
  controllers: [FtUserInformationListener],
  providers: [FtUserInformationService],
  exports: [FtUserInformationService],
})
export class FtUserInformationModule {}
