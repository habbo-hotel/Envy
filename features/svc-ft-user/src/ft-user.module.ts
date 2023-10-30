import {Module} from '@nestjs/common';
import {CommonModule} from '@envy/lib-api';
import {FtUserService} from './ft-user.service';
import {FtUserListener} from './ft-user.listener';
import {
  MessagingGatewayClientModule,
  ProfileClientModule,
} from '@envy/lib-client';

@Module({
  imports: [MessagingGatewayClientModule, ProfileClientModule, CommonModule],
  controllers: [FtUserListener],
  providers: [FtUserService],
  exports: [FtUserService],
})
export class FtUserModule {}
