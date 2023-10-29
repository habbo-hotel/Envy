import {MessagingExternalEvent} from '@envy/lib-client';
import {BaseOutgoingPacket} from '../base-outgoing.packet';

export class AuthenticationSuccessOutgoingPacket extends BaseOutgoingPacket<AuthenticationSuccessOutgoingPacketData> {
  readonly _header = MessagingExternalEvent.AUTHENTICATION_SUCCESS;
}

export interface AuthenticationSuccessOutgoingPacketData {}
