import {MessagingExternalEvent} from '@envy/lib-client';
import {OutgoingPacketBase} from '../base-outgoing.packet';

export class HabboBroadcastOutgoingPacket
  implements OutgoingPacketBase<HabboBroadcastOutgoingPacketData>
{
  readonly header = MessagingExternalEvent.HABBO_BROADCAST;

  constructor(readonly data: HabboBroadcastOutgoingPacketData) {}

  toBuffer(): Buffer {
    const newBuffer = Buffer.alloc(this.header);
    newBuffer.write(this.data.message);
    return newBuffer;
  }
}

export interface HabboBroadcastOutgoingPacketData {
  message: string;
}
