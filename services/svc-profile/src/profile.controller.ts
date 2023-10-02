import {Controller} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {ProfileRepository} from './profile.repository';
import {profileEntityToProfileWire} from './profile.wire';
import {
  ProfileCreateOneInput,
  ProfileFindManyInput,
  ProfileFindOneInput,
  ProfileWire,
  SVC_PROFILE_INTERNAL_EVENT_CREATE_ONE,
  SVC_PROFILE_INTERNAL_EVENT_FIND_MANY,
  SVC_PROFILE_INTERNAL_EVENT_FIND_ONE,
} from '@envy/lib-client';

@Controller()
export class ProfileController {
  constructor(private readonly profileRepo: ProfileRepository) {}

  @MessagePattern(SVC_PROFILE_INTERNAL_EVENT_CREATE_ONE)
  async profileCreateOne(input: ProfileCreateOneInput): Promise<ProfileWire> {
    const newProfile = await this.profileRepo.create({
      ...input,
    });
    return profileEntityToProfileWire(newProfile);
  }

  @MessagePattern(SVC_PROFILE_INTERNAL_EVENT_FIND_ONE)
  async profileFindOne(filter: ProfileFindOneInput): Promise<ProfileWire> {
    const matchingProfile = await this.profileRepo.findOneOrFail({
      where: {
        id: filter.id,
      },
    });
    return profileEntityToProfileWire(matchingProfile);
  }

  @MessagePattern(SVC_PROFILE_INTERNAL_EVENT_FIND_MANY)
  async profileFindMany(filter: ProfileFindManyInput): Promise<ProfileWire[]> {
    const matchingProfiles = await this.profileRepo.find({
      where: {
        userID: filter.userID,
      },
    });
    return matchingProfiles.map(profileEntityToProfileWire);
  }
}
