import {Module} from '@nestjs/common';
import {ProfileEntity} from './profile.entity';
import {registerEnumType} from '@nestjs/graphql';
import {ProfileResolver} from './profile.resolver';
import {ProfileSortBy} from './profile.input';
import {ProfileController} from './profile.controller';
import {ProfileRepository} from './profile.repository';
import {
  GraphQLModule,
  DatabaseModule,
  CommonModule,
  SessionModule,
} from '@envy/lib-api';
import {ProfileService} from './profile.service';

@Module({
  imports: [
    CommonModule,
    SessionModule,
    GraphQLModule.forRoot(),
    DatabaseModule.forRoot({
      entities: [ProfileEntity],
      synchronize: true,
    }),
  ],
  providers: [ProfileRepository, ProfileResolver, ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}

registerEnumType(ProfileSortBy, {
  name: 'ProfileSortBy',
});
