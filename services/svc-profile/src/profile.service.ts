import {Injectable} from '@nestjs/common';
import {FindManyOptions, In} from 'typeorm';
import {ProfileWire} from '@envy/lib-client';
import {ProfileEntity} from './profile.entity';
import {ProfileRepository} from './profile.repository';
import {ProfileFilterByManyInput, ProfileSortBy} from './profile.input';
import {profileEntityToProfileWire} from './profile.wire';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async findMany(filters: ProfileFilterByManyInput): Promise<ProfileWire[]> {
    const queryOpts: FindManyOptions<ProfileEntity> = {
      where: {
        id: filters.ids && In(filters.ids),
        userID: filters.userIDs && In(filters.userIDs),
        username: filters.usernames && In(filters.usernames),
      },
      take: filters.limit,
    };

    if (filters.sortBy) {
      for (const sortBy of filters.sortBy) {
        if (sortBy === ProfileSortBy.NEWEST_PROFILE) {
          queryOpts.order = {
            ...queryOpts.order,
            createdAt: 'desc',
          };
        }
      }
    }

    const matchingProfiles = await this.profileRepo.find(queryOpts);
    return matchingProfiles.map(profileEntityToProfileWire);
  }
}
