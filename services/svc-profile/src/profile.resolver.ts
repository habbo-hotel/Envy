import RandomWords from 'random-words';
import {ProfileModel} from './profile.model';
import {SessionWire} from '@envy/lib-client';
import {ProfileEntity} from './profile.entity';
import {ProfileService} from './profile.service';
import {UnauthorizedException} from '@nestjs/common';
import {GetSession, HasSession} from '@envy/lib-api';
import {ProfileRepository} from './profile.repository';
import {
  Args,
  Mutation,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import {
  ProfileCreateInput,
  ProfileFilterByManyInput,
  ProfileFilterByOneInput,
  ProfileUpdateInput,
} from './profile.input';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(
    private readonly profileRepo: ProfileRepository,
    private readonly profileService: ProfileService
  ) {}

  // TODO: Add Privacy Guard
  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<ProfileModel> {
    return this.profile({id: reference.id});
  }

  @Query(() => ProfileModel)
  async profile(
    @Args('filter') filter: ProfileFilterByOneInput
  ): Promise<ProfileEntity> {
    return this.profileRepo.findOneOrFail({
      where: filter,
    });
  }

  @Query(() => [ProfileModel])
  profiles(
    @Args('filter', {type: () => ProfileFilterByManyInput, nullable: true})
    filter: ProfileFilterByManyInput = {}
  ): Promise<ProfileEntity[]> {
    return this.profileService.findMany(filter);
  }

  @Mutation(() => ProfileModel)
  @HasSession()
  async profileCreate(
    @GetSession() session: SessionWire,
    @Args('input') input: ProfileCreateInput
  ): Promise<ProfileModel> {
    const newProfile = await this.profileRepo.create({
      userID: session.userID,
      username: input.username,
    });
    return newProfile;
  }

  @Mutation(() => ProfileModel)
  @HasSession()
  async profileCreateRandomized(
    @GetSession() session: SessionWire
  ): Promise<ProfileModel> {
    const words = RandomWords(3);

    const username = words.join('-');

    const newProfile = await this.profileRepo.create({
      userID: session.userID,
      username,
    });
    return newProfile;
  }

  @Mutation(() => ProfileModel)
  @HasSession()
  async profileUpdate(
    @GetSession() session: SessionWire,
    @Args('filter') filter: ProfileFilterByOneInput,
    @Args('input') input: ProfileUpdateInput
  ): Promise<ProfileModel> {
    const matchingProfile = await this.profileRepo.findOneOrFail({
      where: filter,
    });

    if (matchingProfile.userID !== session.userID) {
      throw new UnauthorizedException();
    }

    await this.profileRepo.update(filter, input);
    return this.profile(filter);
  }

  @Mutation(() => Boolean)
  async profileDelete(
    @GetSession() session: SessionWire,
    @Args('filter') filter: ProfileFilterByOneInput
  ) {
    const matchingProfile = await this.profileRepo.findOneOrFail({
      where: filter,
    });

    if (matchingProfile.userID !== session.userID) {
      throw new UnauthorizedException();
    }

    await this.profileRepo.softDelete(filter);
    return true;
  }
}
