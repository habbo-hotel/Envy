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

export enum MessagingExternalEvent {
  USER_HOME_ROOM = 2875,
  USER_EFFECTS_LIST = 340,
  USER_CLOTHES = 1450,
  NEW_USER_IDENTITY = 3738,
  USER_PERMISSIONS = 411,
  AVAILABILITY_STATUS = 2033,
  PING_COMPOSER = 3928,
  ENABLE_NOTIFICATIONS = 3284,
  USER_ACHIEVEMENT_SCORE = 1968,
  IS_FIRST_LOGIN_OF_DAY = 793,
  MYSTERY_BOX_KEYS = 2833,
  BUILDERS_CLUB_EXPIRED = 1452,
  CFH_TOPICS_MESSAGE = 325,
  FAVORITE_ROOMS_COUNT = 151,
  GAMES_CENTER_GAME_LIST = 222,
  GAME_CENTER_ACCOUNT_INFO = 2893,
  USER_CLUB = 954,
}

export interface MessagingGatewaySendMessageEventRequest<D> {
  clientID?: number;
  event: MessagingExternalEvent;
  data: D;
}

export interface MessagingGatewaySendMessageEventResponse {
  success: boolean;
}

export interface MessagingGatewayMessageReceivedEvent<D> {
  clientID?: number;
  event: MessagingInternalEvent;
  data: D;
}
