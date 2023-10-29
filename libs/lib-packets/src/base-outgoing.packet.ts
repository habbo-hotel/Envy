import ByteBuf from 'bytebuffer';
import {MessagingExternalEvent} from '@envy/lib-client';

export interface OutgoingPacketBase<D> {
  _buffer: ByteBuf;
  data: D;
  _header: MessagingExternalEvent;
  toBuffer(): Buffer;
}

export class BaseOutgoingPacket<D> implements OutgoingPacketBase<D> {
  readonly _buffer: ByteBuf;
  readonly _header!: MessagingExternalEvent;

  constructor(readonly data: D) {
    console.log(
      `Outgoing packet #${this._header} ${
        MessagingExternalEvent[this._header]
      } with data ${this.data}`
    );
    this._buffer = new ByteBuf(0);
    this._buffer.writeShort(this._header);
  }

  _writeBooleanToBuffer(value: boolean) {
    // @ts-ignore
    this._buffer.writeByte(Buffer.from(String.fromCharCode(value)));
  }

  toBuffer(): Buffer {
    return this._buffer.toBuffer();
  }
}
