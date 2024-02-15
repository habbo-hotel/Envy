import {Directive, Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class ProfileModel {
  @Field(() => Number)
  @Directive('@external')
  id!: number;
}
