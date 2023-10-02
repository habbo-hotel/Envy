export const SVC_GATEWAY_NAME = 'GatewayService';
export const SVC_GATEWAY_WEB_SERVER_PORT = 3000;
export const SVC_GATEWAY_WEB_SERVER_ADDRESS =
  process.env.SVC_GATEWAY_WEB_SERVER_ADDRESS ??
  `http://localhost:${SVC_GATEWAY_WEB_SERVER_PORT}/graphql`;
