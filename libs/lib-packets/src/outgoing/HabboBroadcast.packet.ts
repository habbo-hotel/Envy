import {MessagingExternalEvent} from '@envy/lib-client';
import {BaseOutgoingPacket} from '../base-outgoing.packet';

export class HabboBroadcastOutgoingPacket extends BaseOutgoingPacket<HabboBroadcastOutgoingPacketData> {
  readonly _header = MessagingExternalEvent.HABBO_BROADCAST;

  toBuffer(): Buffer {
    console.log('x');
    this._buffer.writeString(this.data.message);
    return this._buffer.toBuffer();
  }
}

export interface HabboBroadcastOutgoingPacketData {
  message: string;
}
