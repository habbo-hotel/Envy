import {MessagingExternalEvent} from '@envy/lib-client';
import {BaseOutgoingPacket} from '../base-outgoing.packet';

export class UserInformationOutgoingPacket extends BaseOutgoingPacket<UserInformationOutgoingPacketData> {
  constructor(data: UserInformationOutgoingPacketData) {
    super(MessagingExternalEvent.USER_INFORMATION, data);
    this.getRawBuffer().writeInt(data.id);
    this.getRawBuffer().writeString(data.username);
    this.getRawBuffer().writeString(data.look);
    this.getRawBuffer().writeString(data.gender);
    this.getRawBuffer().writeString(data.motto);
    this.getRawBuffer().writeBool(data.allowDMs);
    this.getRawBuffer().writeInt(data.respectsTotal);
    this.getRawBuffer().writeInt(data.respectsProfilesLeft);
    this.getRawBuffer().writeInt(data.respectPetsLeft);
    this.getRawBuffer().writeBool(data.publishingAllowed);
    this.getRawBuffer().writeBool(data.nameChangesAllowed);
    this.getRawBuffer().writeBool(data.safetyLocked);
  }
}

export interface UserInformationOutgoingPacketData {
  id: number;
  username: string;
  look: string;
  gender: 'm' | 'f';
  motto: string;
  realName: string;
  allowDMs: boolean;
  respectsTotal: number;
  respectsProfilesLeft: number;
  respectPetsLeft: number;
  publishingAllowed: false;
  lastOnline: string;
  nameChangesAllowed: boolean;
  safetyLocked: boolean;
}
