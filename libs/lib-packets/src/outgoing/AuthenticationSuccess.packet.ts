import {MessagingExternalEvent} from '@envy/lib-client';
import {BaseOutgoingPacket} from '../base-outgoing.packet';

export class AuthenticationSuccessOutgoingPacket extends BaseOutgoingPacket<AuthenticationSuccessOutgoingPacketData> {
  constructor(data: AuthenticationSuccessOutgoingPacketData) {
    super(MessagingExternalEvent.AUTHENTICATION_SUCCESS, data);
  }
}

export interface AuthenticationSuccessOutgoingPacketData {}
