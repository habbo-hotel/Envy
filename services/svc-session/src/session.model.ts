import {Directive, Field, ObjectType} from '@nestjs/graphql';
import {ProfileModel} from '@envy/lib-client';

@ObjectType()
@Directive('@key(fields: "id")')
export class SessionModel {
  @Field(() => Number, {nullable: true})
  id?: number;

  @Field(() => Number, {nullable: true})
  userID?: number;

  @Field(() => Number, {nullable: true})
  profileID?: number;

  @Field(() => ProfileModel, {nullable: true})
  profile?: ProfileModel;
}
