import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {Injectable} from '@nestjs/common';
import {BaseRepository} from '@envy/lib-api';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(@InjectRepository(UserEntity) userRepo: Repository<UserEntity>) {
    super(userRepo);
  }
}
