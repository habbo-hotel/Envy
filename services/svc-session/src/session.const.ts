const EIGHT_HOURS = 8 * 60 * 60 * 1000;
export const DEFAULT_SESSION_LENGTH = EIGHT_HOURS;

export const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) throw new Error('JWT_SECRET is missing');

export const JWT_EXPIRES = process.env.JWT_EXPIRES ?? DEFAULT_SESSION_LENGTH;
