import {MessagingExternalEvent} from '@envy/lib-client';
import {BaseOutgoingPacket} from '../base-outgoing.packet';

export class NavigatorSettingsOutgoingPacket extends BaseOutgoingPacket<NavigatorSettingsOutgoingPacketData> {
  readonly _header = MessagingExternalEvent.NAVIGATOR_SETTINGS;

  toBuffer(): Buffer {
    console.log('y');
    this._buffer.writeInt(this.data.homeRoomID);
    this._buffer.writeInt(this.data.enterRoomID);
    return this._buffer.toBuffer();
  }
}

export interface NavigatorSettingsOutgoingPacketData {
  homeRoomID: number;
  enterRoomID: number;
}
