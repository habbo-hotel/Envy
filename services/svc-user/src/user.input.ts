import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UserFilterByManyInput {
  @Field(() => [Number], {nullable: true})
  ids?: number[];

  @Field(() => [String], {nullable: true})
  emails?: string[];
}

@InputType()
export class UserFilterByOneInput {
  @Field(() => Number, {nullable: true})
  id?: number;

  @Field(() => String, {nullable: true})
  email?: string;
}

@InputType()
export class UserCreateInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}

@InputType()
export class UserUpdateInput {
  @Field(() => String, {nullable: true})
  email?: string;

  @Field(() => String, {nullable: true})
  password?: string;
}

@InputType()
export class UserChangePasswordInput {
  @Field(() => String)
  currentPassword!: string;

  @Field(() => String)
  newPassword!: string;

  @Field(() => String)
  newPasswordAgain!: string;
}
