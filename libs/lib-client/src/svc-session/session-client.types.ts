export interface SessionWire {
  sessionID: number;
  userID: number;
  profileID: number;
  expiresAt: number;
}

export interface SessionFindOneInput {
  id: number;
}
