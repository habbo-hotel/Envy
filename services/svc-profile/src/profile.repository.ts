import {Repository} from 'typeorm';
import {ProfileEntity} from './profile.entity';
import {Injectable} from '@nestjs/common';
import {BaseRepository} from '@envy/lib-api';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ProfileRepository extends BaseRepository<ProfileEntity> {
  constructor(
    @InjectRepository(ProfileEntity) userRepo: Repository<ProfileEntity>
  ) {
    super(userRepo);
  }
}
