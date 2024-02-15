import {MessagingExternalEvent} from '@envy/lib-client';
import {BaseOutgoingPacket} from '../base-outgoing.packet';

export class AvailabilityStatusOutgoingPacket extends BaseOutgoingPacket<AvailabilityStatusOutgoingPacketData> {
  constructor(data: AvailabilityStatusOutgoingPacketData) {
    super(MessagingExternalEvent.AVAILABILITY_STATUS, data);
    this.getRawBuffer().writeBool(true);
    this.getRawBuffer().writeBool(false);
    this.getRawBuffer().writeBool(true);
  }
}

export interface AvailabilityStatusOutgoingPacketData {}
