import {RoleScopesWire} from '@envy/lib-client';
import {Directive, Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class RoleScopesModel implements RoleScopesWire {
  @Field(() => Boolean, {
    nullable: true,
    description: 'Bypass all permissions',
  })
  isSuperAdmin!: boolean;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class RoleModel {
  @Field({nullable: true})
  id?: number;

  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  description?: string;

  @Field(() => RoleScopesModel, {nullable: true})
  scopes?: RoleScopesModel;
}
