import {MessagingInternalEvent} from '@envy/lib-client';

export interface IncomingPacketBase<D> {
  constructor(data: D): Buffer;
  header: MessagingInternalEvent;
}
