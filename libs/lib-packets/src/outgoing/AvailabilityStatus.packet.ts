import {MessagingExternalEvent} from '@envy/lib-client';
import {OutgoingPacketBase} from '../base-outgoing.packet';

export class AvailabilityStatusOutgoingPacket
  implements OutgoingPacketBase<AvailabilityStatusOutgoingPacketData>
{
  readonly header = MessagingExternalEvent.AVAILABILITY_STATUS;

  constructor(readonly data: AvailabilityStatusOutgoingPacketData) {}

  toBuffer(): Buffer {
    const newBuffer = Buffer.alloc(this.header);
    newBuffer.write('true');
    newBuffer.write('false');
    newBuffer.write('true');
    return newBuffer;
  }
}

export interface AvailabilityStatusOutgoingPacketData {}
