import {MessagingExternalEvent} from '@envy/lib-client';
import {OutgoingPacketBase} from '../base-outgoing.packet';

export class AuthenticationSuccessOutgoingPacket
  implements OutgoingPacketBase<AuthenticationSuccessOutgoingPacketData>
{
  readonly header = MessagingExternalEvent.AUTHENTICATION_SUCCESS;

  constructor(readonly data: AuthenticationSuccessOutgoingPacketData) {}

  toBuffer(): Buffer {
    const newBuffer = Buffer.alloc(this.header);
    return newBuffer;
  }
}

export interface AuthenticationSuccessOutgoingPacketData {}
