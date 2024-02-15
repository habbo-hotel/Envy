import {lastValueFrom} from 'rxjs';
import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {RoleFindOneInput, RoleWire} from './role-client.types';
import {SVC_ROLE_INTERNAL_EVENT_FIND_ONE, SVC_ROLE_NAME} from './role.const';

@Injectable()
export class RoleClientService {
  constructor(@Inject(SVC_ROLE_NAME) private client: ClientProxy) {}

  async findOne(input: RoleFindOneInput): Promise<RoleWire> {
    const matchingRole$ = this.client.send(
      SVC_ROLE_INTERNAL_EVENT_FIND_ONE,
      input
    );
    return await lastValueFrom(matchingRole$);
  }
}
