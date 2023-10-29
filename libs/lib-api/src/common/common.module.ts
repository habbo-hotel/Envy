import {Module} from '@nestjs/common';
import {HashService} from './hash.service';
import {LoggerService} from './logger.service';

@Module({
  providers: [HashService, LoggerService],
  exports: [HashService, LoggerService],
})
export class CommonModule {}
