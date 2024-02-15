import {lastValueFrom} from 'rxjs';
import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {
  ProfileCreateOneInput,
  ProfileFindManyInput,
  ProfileFindOneInput,
  ProfileWire,
} from './profile-client.types';
import {
  SVC_PROFILE_INTERNAL_EVENT_CREATE_ONE,
  SVC_PROFILE_INTERNAL_EVENT_FIND_MANY,
  SVC_PROFILE_INTERNAL_EVENT_FIND_ONE,
  SVC_PROFILE_NAME,
} from './profile.const';

@Injectable()
export class ProfileClientService {
  constructor(@Inject(SVC_PROFILE_NAME) private client: ClientProxy) {}

  async create(input: ProfileCreateOneInput): Promise<ProfileWire> {
    const newProfile$ = this.client.send(
      SVC_PROFILE_INTERNAL_EVENT_CREATE_ONE,
      input
    );
    return await lastValueFrom(newProfile$);
  }

  async findOne(filter: ProfileFindOneInput): Promise<ProfileWire> {
    const matchingProfile$ = this.client.send(
      SVC_PROFILE_INTERNAL_EVENT_FIND_ONE,
      filter
    );
    return await lastValueFrom(matchingProfile$);
  }

  async findMany(filter: ProfileFindManyInput): Promise<ProfileWire[]> {
    const matchingProfiles$ = this.client.send(
      SVC_PROFILE_INTERNAL_EVENT_FIND_MANY,
      filter
    );
    return await lastValueFrom(matchingProfiles$);
  }
}
