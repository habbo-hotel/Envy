import {Directive, Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class UserModel {
  @Field({nullable: true})
  id?: number;

  // TODO: Add Privacy Guard
  @Field({nullable: true})
  email?: string;
}
