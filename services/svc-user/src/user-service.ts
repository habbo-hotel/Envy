import {UserRepository} from './user.repository';
import {Injectable, UnauthorizedException} from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async canAccessUser(
    authenticatedUserID: number,
    requestedUserID: number
  ): Promise<boolean> {
    if (authenticatedUserID === requestedUserID) {
      return true;
    }

    const authenticatedUser = await this.userRepo.findOneOrFail({
      where: {id: authenticatedUserID},
    });

    throw new UnauthorizedException();
  }
}
