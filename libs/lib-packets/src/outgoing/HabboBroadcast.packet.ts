import { MessagingExternalEvent } from '@envy/lib-client';
import { BaseOutgoingPacket } from '../base-outgoing.packet';

export class HabboBroadcastOutgoingPacket extends BaseOutgoingPacket<HabboBroadcastOutgoingPacketData> {
  constructor(data: HabboBroadcastOutgoingPacketData) {
    super(MessagingExternalEvent.HABBO_BROADCAST, data);
    this.getRawBuffer().writeString(this.getData().message);
  }
}

export interface HabboBroadcastOutgoingPacketData {
  message: string;
}
