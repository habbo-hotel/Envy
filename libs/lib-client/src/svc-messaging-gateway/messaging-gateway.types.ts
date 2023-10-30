import { Buffer } from '@envy/lib-packets';

export enum MessagingInternalEvent {
  PONG_EVENT = 2596,
  VERSION_CHECK = 4000,
  INIT_HANDSHAKE = 1525,
  SECURE_LOGIN = 2419,
  COMPLETE_HANDSHAKE = 3557,
  UNIQUE_ID = 3786,
  SSO_TICKET = 1887,
  INFO_RETRIEVE = 357,
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
  PING = 3928,
  AUTHENTICATION_SUCCESS = 2491,
  AVAILABILITY_STATUS = 2033,
  NAVIGATOR_SETTINGS = 2875,
  HABBO_BROADCAST = 3801,
  USER_INFORMATION = 2725,
}

export interface MessagingGatewayBroadcastMessageEventRequest<D> {
  event: MessagingExternalEvent;
  data: D;
}

export interface MessagingGatewaySendMessageEventRequest<D> {
  clientID: string;
  buffer: Buffer;
}

export interface MessagingGatewayBroadcastMessageEventResponse {
  success: boolean;
}

export interface MessagingGatewaySendMessageEventResponse {
  success: boolean;
}

export interface MessagingGatewayMessageReceivedEvent<D> {
  clientID: string;
  event: MessagingInternalEvent;
  data: D;
}


/*
  PerkAllowancesComposer          int16 = 2586
  FriendRequestsComposer          int16 = 280
  MessengerInitComposer           int16 = 1605
  FriendListFragmentComposer      int16 = 3130
  AchievementsComposer            int16 = 305
  ScrSendUserInfoComposer         int16 = 954
  CreditBalanceComposer           int16 = 3475
  ActivityPointsComposer          int16 = 2018
  GuildEditorDataComposer         int16 = 2238
  InitCameraComposer              int16 = 3878
  UserFlatCatsComposer            int16 = 1562
  NewNavigatorPreferencesComposer int16 = 518