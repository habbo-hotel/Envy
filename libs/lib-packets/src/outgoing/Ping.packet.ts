import {MessagingExternalEvent} from '@envy/lib-client';
import {BaseOutgoingPacket} from '../base-outgoing.packet';

export class PingOutgoingPacket extends BaseOutgoingPacket<PingOutgoingPacketData> {
  constructor(data: PingOutgoingPacketData) {
    super(MessagingExternalEvent.PING, data);
  }
}

export interface PingOutgoingPacketData {}
