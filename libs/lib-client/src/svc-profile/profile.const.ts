export const SVC_PROFILE_NAME = 'ProfileService';
export const SVC_PROFILE_WEB_PORT = 3008;
export const SVC_PROFILE_WEB_ADDRESS =
  process.env.SVC_PROFILE_WEB_ADDRESS ??
  `http://localhost:${SVC_PROFILE_WEB_PORT}/graphql`;

export const SVC_PROFILE_INTERNAL_EVENT_CREATE_ONE = 'profileCreateOne';
export const SVC_PROFILE_INTERNAL_EVENT_FIND_ONE = 'profileFindOne';
export const SVC_PROFILE_INTERNAL_EVENT_FIND_MANY = 'profileFindMany';
