import {MessagingExternalEvent} from '@envy/lib-client';
import {BaseOutgoingPacket} from '../base-outgoing.packet';

export class AvailabilityStatusOutgoingPacket extends BaseOutgoingPacket<AvailabilityStatusOutgoingPacketData> {
  readonly _header = MessagingExternalEvent.AVAILABILITY_STATUS;

  toBuffer(): Buffer {
    this._writeBooleanToBuffer(true);
    this._writeBooleanToBuffer(false);
    this._writeBooleanToBuffer(true);
    return this._buffer.toBuffer();
  }
}

export interface AvailabilityStatusOutgoingPacketData {}
