import {MessagingInternalEvent} from '@envy/lib-client';

export interface IncomingPacketBase<D> {
  buffer: Buffer;
  constructor(data: D): Buffer;
  header: MessagingInternalEvent;
}
