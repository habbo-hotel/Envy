import {MessagingExternalEvent} from '@envy/lib-client';
import {BaseOutgoingPacket} from '../base-outgoing.packet';

export class NavigatorSettingsOutgoingPacket extends BaseOutgoingPacket<NavigatorSettingsOutgoingPacketData> {
  constructor(data: NavigatorSettingsOutgoingPacketData) {
    super(MessagingExternalEvent.NAVIGATOR_SETTINGS, data);
    this._buffer.writeInt(this.getData().homeRoomID);
    this._buffer.writeInt(this.getData().enterRoomID);
  }
}

export interface NavigatorSettingsOutgoingPacketData {
  homeRoomID: number;
  enterRoomID: number;
}
