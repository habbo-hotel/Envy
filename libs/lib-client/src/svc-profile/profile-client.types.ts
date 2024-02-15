export interface ProfileWire {
  id: number;
  userID: number;
  username: string;
}

export interface ProfileFindOneInput {
  id?: number;
  username?: string;
}

export interface ProfileFindManyInput {
  userID?: number;
}

export interface ProfileCreateOneInput {
  userID: number;
  username: string;
}
