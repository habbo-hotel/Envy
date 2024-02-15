import {Directive, Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class ProfileModel {
  @Field(() => Number, {nullable: true})
  id?: number;

  @Field(() => Number, {nullable: true})
  userID?: number;

  @Field(() => String, {nullable: true})
  username?: string;
}
