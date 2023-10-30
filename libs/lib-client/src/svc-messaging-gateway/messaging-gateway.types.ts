import {Buffer} from '@envy/lib-packets';

export enum MessagingInternalEvent {
  PONG = 2596,
  VERSION_CHECK = 4000,
  SSO_TICKET = 2419,
  GET_FRIEND_REQUESTS = 2448,
  INFO_RETRIEVE = 357,
  GET_ACHIEVEMENTS = 219,
  MESSENGER_INIT = 2781,
  SCR_GET_USER_INFO = 3166,
  GET_CREDITS_INFO = 273,
  GET_GUILD_EDITOR_DATA = 813,
  REQUEST_CAMERA_CONFIGURATION = 796,
  GET_NEXT_TARGETED_OFFER = 2487,
  GET_CLUB_GIFT_INFO = 487,
  GET_KICKBACK_INFO = 869,
  GET_IGNORED_USERS = 3878,
  GET_USERS_FLAT_CATS = 3027,
  GET_USER_EVENT_CATS = 1782,
  SEND_MSG = 3567,
  FRIEND_LIST_UPDATE = 1419,
  HABBO_SEARCH = 1210,
  GET_EXTENDED_PROFILE = 3625,
  GET_SELECTED_BADGES = 2091,
  GET_RELATIONSHIP_STATUS_INFO = 2138,
  SET_RELATIONSHIP_STATUS_INFO = 3768,
  REQUEST_FRIEND = 3157,
}

export enum MessagingExternalEvent {
  PING = 3928,
  AUTHENTICATION_SUCCESS = 2491,
  AVAILABILITY_STATUS = 2033,
  NAVIGATOR_SETTINGS = 2875,
  HABBO_BROADCAST = 3801,
  USER_INFORMATION = 2725,
  FRIEND_REQUESTS = 280,
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
*/
