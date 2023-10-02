import {In} from 'typeorm';
import {UserModel} from './user.model';
import {UserEntity} from './user.entity';
import {UserService} from './user-service';
import {UserRepository} from './user.repository';
import {DEFAULT_USER_ROLE_ID} from './user.const';
import {UserClientService} from '@envy/lib-client';
import {BadRequestException, UnauthorizedException} from '@nestjs/common';
import {
  GetSession,
  HasSession,
  HashService,
  SessionContents,
} from '@envy/lib-api';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import {
  UserChangePasswordInput,
  UserCreateInput,
  UserFilterByManyInput,
  UserFilterByOneInput,
  UserUpdateInput,
} from './user.input';
import {userEntityToUserWire} from './user.wire';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly userClientService: UserClientService
  ) {}

  @HasSession()
  @ResolveField(() => String, {nullable: true})
  email(
    @GetSession() session: SessionContents,
    @Parent() user: UserEntity
  ): string {
    this.userService.canAccessUser(session.userID, user.id!);
    return user.email;
  }

  @HasSession()
  @ResolveField(() => Boolean, {nullable: true})
  // TODO: Determine if user is verified by checking for payment methods, etc
  isVerified(
    @GetSession() session: SessionContents,
    @Parent() user: UserEntity
  ): boolean {
    this.userService.canAccessUser(session.userID, user.id!);
    return true;
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<UserModel> {
    return this.user({id: reference.id});
  }

  @Query(() => UserModel)
  async user(
    @Args('filter') filter: UserFilterByOneInput
  ): Promise<UserEntity> {
    return this.userRepo.findOneOrFail({
      where: filter,
    });
  }

  @Query(() => [UserModel])
  users(
    @Args('filter', {type: () => UserFilterByManyInput, nullable: true})
    filter?: UserFilterByManyInput
  ): Promise<UserEntity[]> {
    return this.userRepo.find({
      where: {
        id: filter?.ids && In(filter.ids),
        email: filter?.emails && In(filter.emails),
      },
    });
  }

  @Mutation(() => UserModel)
  async userCreate(@Args('input') input: UserCreateInput): Promise<UserEntity> {
    const newUser = await this.userRepo.create({
      roleID: DEFAULT_USER_ROLE_ID,
      email: input.email,
      hashedPassword: this.hashService.generate(input.password),
    });
    await this.userClientService.created(userEntityToUserWire(newUser));
    return newUser;
  }

  @Mutation(() => UserModel)
  async userUpdate(
    @Args('filter') filter: UserFilterByOneInput,
    @Args('input') input: UserUpdateInput
  ): Promise<UserEntity> {
    await this.userRepo.update(filter, input);
    return this.user(filter);
  }

  @Mutation(() => Boolean)
  async userChangePassword(
    @Args('filter') filter: UserFilterByOneInput,
    @Args('input') input: UserChangePasswordInput
  ): Promise<boolean> {
    const matchingUser = await this.user(filter);

    const currentPasswordMatches = this.hashService.compare(
      input.currentPassword,
      matchingUser.hashedPassword
    );

    if (!currentPasswordMatches) {
      throw new UnauthorizedException();
    }

    if (input.newPassword !== input.newPasswordAgain) {
      throw new BadRequestException();
    }

    const newPasswordHashed = this.hashService.generate(input.newPassword);

    await this.userRepo.update(filter, {hashedPassword: newPasswordHashed});

    return true;
  }

  @Mutation(() => Boolean)
  async userDelete(@Args('filter') filter: UserFilterByOneInput) {
    await this.userRepo.softDelete(filter);
    return true;
  }
}
