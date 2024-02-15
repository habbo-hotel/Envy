import {MessagingExternalEvent} from '@envy/lib-client';
import {BaseOutgoingPacket} from '../base-outgoing.packet';

export class MessengerInitOutgoingPacket extends BaseOutgoingPacket<NavigatorSettingsOutgoingPacketData> {
  constructor(data: NavigatorSettingsOutgoingPacketData) {
    super(MessagingExternalEvent.NAVIGATOR_SETTINGS, data);
    this.getRawBuffer().writeInt(data.friendLimit); // Friend limit
    this.getRawBuffer().writeInt(0); // Not Used
    this.getRawBuffer().writeInt(data.extendedFirendsLimit); // Extended friends limit
    this.getRawBuffer().writeInt(0); // Friend categories
  }
}

export interface NavigatorSettingsOutgoingPacketData {
  friendLimit: number;
  extendedFirendsLimit: number;
}
