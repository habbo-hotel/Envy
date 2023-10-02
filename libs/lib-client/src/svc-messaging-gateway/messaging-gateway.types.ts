export enum MessagingInternalEvent {
  PONG_EVENT = 2596,
  VERSION_CHECK = 4000,
  INIT_HANDSHAKE = 1525,
  SECURE_LOGIN = 2419,
  COMPLETE_HANDSHAKE = 3557,
  UNIQUE_ID = 3786,
  SSO_TICKET = 1887,
  INFO_RETRIEVE = 3897,
  CREDITS_INFO = 184,
  SOUND_SETTINGS = 3206,
  FURNITURE_ALIASES = 2403,
  ROOM_ENTRY_DATA = 2589,
  MESSENGER_INIT = 2959,
  GET_USER_FLAT_CATS = 2232,
  GET_BUDDY_REQUESTS = 66,
  GET_ROOM_VISITS = 3893,
  PROMOTED_ROOMS = 569,
  GET_GROUP_BADGES = 243,
  MY_ROOMS_SEARCH = 2606,
  OPEN_FLAT_CONNECTION = 3056,
}

export enum MessagingExternalEvent {}

export interface MessagingGatewaySendMessageEventRequest<D> {
  event: MessagingExternalEvent;
  data: D;
}

export interface MessagingGatewaySendMessageEventResponse {
  success: boolean;
}

export interface MessagingGatewayMessageReceivedEvent<D> {
  event: MessagingInternalEvent;
  data: D;
}
