import {MessagingExternalEvent} from '@envy/lib-client';

export interface OutgoingPacketBase<D> {
  data: D;
  header: MessagingExternalEvent;
  toBuffer(): Buffer;
}
