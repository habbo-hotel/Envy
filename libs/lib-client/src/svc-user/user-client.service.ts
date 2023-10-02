import {lastValueFrom} from 'rxjs';
import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {
  SVC_USER_INTERNAL_EVENT_FIND_ONE,
  SVC_USER_INTERNAL_EVENT_PASSWORD_COMPARISON,
  SVC_USER_INTERNAL_EVENT_UPDATE_ONE,
  SVC_USER_INTERNAL_EVENT_USER_CREATED,
  SVC_USER_NAME,
} from './user.const';
import {
  UserFindOneInput,
  UserPasswordComparisonInput,
  UserPasswordComparisonResponse,
  UserUpdateOneInput,
  UserUpdateOneParams,
  UserWire,
} from './user-client.types';

@Injectable()
export class UserClientService {
  constructor(@Inject(SVC_USER_NAME) private client: ClientProxy) {}

  async findOne(input: UserFindOneInput): Promise<UserWire> {
    const matchingUser$ = this.client.send(
      SVC_USER_INTERNAL_EVENT_FIND_ONE,
      input
    );
    return await lastValueFrom(matchingUser$);
  }

  async passwordComparison(
    input: UserPasswordComparisonInput
  ): Promise<UserPasswordComparisonResponse> {
    const matchingPassword$ = this.client.send(
      SVC_USER_INTERNAL_EVENT_PASSWORD_COMPARISON,
      input
    );
    return await lastValueFrom(matchingPassword$);
  }

  async userUpdateOne(params: UserUpdateOneParams): Promise<boolean> {
    const userUpdate = this.client.send(
      SVC_USER_INTERNAL_EVENT_UPDATE_ONE,
      params
    );
    return await lastValueFrom(userUpdate);
  }

  async created(newUser: UserWire): Promise<void> {
    await this.client.emit(SVC_USER_INTERNAL_EVENT_USER_CREATED, newUser);
  }
}
