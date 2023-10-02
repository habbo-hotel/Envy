import {Field, InputType} from '@nestjs/graphql';
import {RoleScopesWire} from '@envy/lib-client';

@InputType()
export class RoleFilterByManyInput {
  @Field(() => [Number], {nullable: true})
  ids?: number[];
}

@InputType()
export class RoleFilterByOneInput {
  @Field(() => Number, {nullable: true})
  id?: number;
}

@InputType()
export class RoleScopesInput implements RoleScopesWire {
  @Field(() => Boolean)
  profileCreate!: boolean;

  @Field(() => Boolean)
  bypassUserPrivacy!: boolean;
}

@InputType()
export class RoleCreateInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => RoleScopesInput)
  scopes!: RoleScopesInput;
}

@InputType()
export class RoleUpdateInput {
  @Field(() => String, {nullable: true})
  name?: string;

  @Field(() => String, {nullable: true})
  description?: string;

  @Field(() => RoleScopesInput, {nullable: true})
  scopes?: RoleScopesInput;
}
