import {RoleScopes} from './role-client.types';

export const SVC_ROLE_NAME = 'RoleService';
export const SVC_ROLE_PORT = 3002;
export const SVC_ROLE_WEB_ADDRESS =
  process.env.SVC_ROLE_WEB_ADDRESS ??
  `http://localhost:${SVC_ROLE_PORT}/graphql`;

export const SVC_ROLE_INTERNAL_EVENT_FIND_ONE = 'roleFindOneByID';

export const ROLE_SCOPES: RoleScopes[] = ['isSuperAdmin'];
