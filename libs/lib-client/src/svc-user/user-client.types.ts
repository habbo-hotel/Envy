export interface UserWire {
  id: number;
  email: string;
  roleID: number;
  favoriteProfileID?: number;
}

export interface UserFindOneInput {
  id?: number;
  email?: string;
}

export type UserFindOneResponse = UserWire;

export interface UserPasswordComparisonInput {
  id: number;
  password: string;
}

export interface UserPasswordComparisonResponse {
  id: number;
  matching: boolean;
}

export interface UserUpdateOneInput {
  email?: string;
  roleID?: number;
  favoriteProfileID?: number;
}

export interface UserUpdateOneParams {
  filter: UserFindOneInput;
  input: UserUpdateOneInput;
}
