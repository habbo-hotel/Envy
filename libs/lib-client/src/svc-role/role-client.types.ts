export interface RoleWire {
  id: number;
  name: string;
  scopes: RoleScopesWire;
}

export interface RoleScopesWire {
  isSuperAdmin: boolean;
}

export type RoleScopes = keyof RoleScopesWire;

export interface RoleFindOneInput {
  id: number;
}
