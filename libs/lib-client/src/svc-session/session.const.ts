export const SVC_SESSION_NAME = 'SessionService';
export const SVC_SESSION_WEB_PORT = 3004;
export const SVC_SESSION_WEB_ADDRESS =
  process.env.SVC_SESSION_WEB_ADDRESS ??
  `http://localhost:${SVC_SESSION_WEB_PORT}/graphql`;

export const SVC_SESSION_INTERNAL_EVENT_FIND_ONE = 'sessionFindOneByID';
