import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class SessionFilterByManyInput {
  @Field(() => [Number], {nullable: true})
  ids?: number[];

  @Field(() => [Number], {nullable: true})
  userIDs?: number[];
}

@InputType()
export class SessionFilterByOneInput {
  @Field(() => Number, {nullable: true})
  id?: number;
}

@InputType()
export class SessionCreateInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => Number, {nullable: true})
  profileID?: number;
}

@InputType()
export class SessionChangeProfileInput {
  @Field(() => Number)
  profileID!: number;
}
