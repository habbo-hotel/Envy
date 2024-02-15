import {Controller} from '@nestjs/common';
import {HashService} from '@envy/lib-api';
import {UserRepository} from './user.repository';
import {userEntityToUserWire} from './user.wire';
import {MessagePattern} from '@nestjs/microservices';
import {
  SVC_USER_INTERNAL_EVENT_FIND_ONE,
  SVC_USER_INTERNAL_EVENT_PASSWORD_COMPARISON,
  SVC_USER_INTERNAL_EVENT_UPDATE_ONE,
  UserFindOneInput,
  UserFindOneResponse,
  UserPasswordComparisonInput,
  UserPasswordComparisonResponse,
  UserUpdateOneParams,
} from '@envy/lib-client';

@Controller()
export class UserController {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashService: HashService
  ) {}

  @MessagePattern(SVC_USER_INTERNAL_EVENT_FIND_ONE)
  async userFindOneByID(
    filter: UserFindOneInput
  ): Promise<UserFindOneResponse> {
    const matchingUser = await this.userRepo.findOneOrFail({
      where: filter,
    });
    return userEntityToUserWire(matchingUser);
  }

  @MessagePattern(SVC_USER_INTERNAL_EVENT_PASSWORD_COMPARISON)
  async userPasswordComparison(
    data: UserPasswordComparisonInput
  ): Promise<UserPasswordComparisonResponse> {
    const matchingUser = await this.userRepo.findOneOrFail({
      where: {
        id: data.id,
      },
    });

    const hasMatchingPassword = await this.hashService.compare(
      data.password,
      matchingUser.hashedPassword
    );

    return {
      id: data.id,
      matching: hasMatchingPassword,
    };
  }

  @MessagePattern(SVC_USER_INTERNAL_EVENT_UPDATE_ONE)
  async userUpdateOne(params: UserUpdateOneParams): Promise<boolean> {
    await this.userRepo.update(params.filter, params.input);
    return true;
  }
}
