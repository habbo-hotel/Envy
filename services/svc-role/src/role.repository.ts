import {Repository} from 'typeorm';
import {RoleEntity} from './role.entity';
import {Injectable} from '@nestjs/common';
import {BaseRepository} from '@envy/lib-api';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> {
  constructor(@InjectRepository(RoleEntity) userRepo: Repository<RoleEntity>) {
    super(userRepo);
  }
}
