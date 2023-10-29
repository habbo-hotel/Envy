import {MessagingExternalEvent} from '@envy/lib-client';
import {OutgoingPacketBase} from '../base-outgoing.packet';

export class NavigatorSettingsOutgoingPacket
  implements OutgoingPacketBase<NavigatorSettingsOutgoingPacketData>
{
  readonly header = MessagingExternalEvent.NAVIGATOR_SETTINGS;

  constructor(readonly data: NavigatorSettingsOutgoingPacketData) {}

  toBuffer(): Buffer {
    const newBuffer = Buffer.alloc(this.header);
    newBuffer.write(this.data.homeRoomID.toString());
    newBuffer.write(
      this.data.homeRoomID ? this.data.homeRoomID.toString() : '0'
    );
    return newBuffer;
  }
}

export interface NavigatorSettingsOutgoingPacketData {
  homeRoomID: number;
  enterRoomID: number;
}
