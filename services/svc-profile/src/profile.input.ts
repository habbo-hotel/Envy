import {Field, InputType} from '@nestjs/graphql';

export enum ProfileSortBy {
  NEWEST_PROFILE = 'NEWEST_PROFILE',
}

@InputType()
export class ProfileFilterByManyInput {
  @Field(() => [Number], {nullable: true})
  ids?: number[];

  @Field(() => [Number], {nullable: true})
  userIDs?: number[];

  @Field(() => [String], {nullable: true})
  usernames?: string[];

  @Field(() => [ProfileSortBy], {nullable: true})
  sortBy?: ProfileSortBy[];

  @Field(() => Number, {nullable: true})
  limit?: number;
}

@InputType()
export class ProfileFilterByOneInput {
  @Field(() => Number, {nullable: true})
  id?: number;

  @Field(() => String, {nullable: true})
  username?: string;
}

@InputType()
export class ProfileCreateInput {
  @Field(() => String)
  username!: string;
}

@InputType()
export class ProfileUpdateInput {
  @Field(() => String, {nullable: true})
  username?: string;
}
