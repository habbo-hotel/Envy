import {MessagingExternalEvent} from '@envy/lib-client';
import {BaseOutgoingPacket} from '../base-outgoing.packet';

export class FriendRequestsOutgoingPacket extends BaseOutgoingPacket<FriendRequestsOutgoingPacketData> {
  constructor(data: FriendRequestsOutgoingPacketData) {
    super(MessagingExternalEvent.FRIEND_REQUESTS, data);
  }
}

export interface FriendRequestsOutgoingPacketData {}
