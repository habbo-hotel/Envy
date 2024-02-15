import {Repository} from 'typeorm';
import {SessionEntity} from './session.entity';
import {Injectable} from '@nestjs/common';
import {BaseRepository} from '@envy/lib-api';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class SessionRepository extends BaseRepository<SessionEntity> {
  constructor(
    @InjectRepository(SessionEntity) userRepo: Repository<SessionEntity>
  ) {
    super(userRepo);
  }
}
