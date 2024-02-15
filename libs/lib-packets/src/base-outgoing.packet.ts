import {Buffer} from './buffer';
import {MessagingExternalEvent} from '@envy/lib-client';

export interface OutgoingPacketBase<D> {
  _data: D;
  _header: MessagingExternalEvent;
  toBuffer(): Buffer;
  getRawBuffer(): Buffer;
  setData(newData: D): void;
  getData(): D;
}

export class BaseOutgoingPacket<D> implements OutgoingPacketBase<D> {
  private _buffer!: Buffer;

  constructor(
    public _header: MessagingExternalEvent,
    public _data: D
  ) {
    console.log(
      `Outgoing packet #${this._header} ${MessagingExternalEvent[this._header]}`
    );
    this._buffer = new Buffer(this._header);
    this._buffer.writeInt(this._header);
  }

  toBuffer(): Buffer {
    return this._buffer.getData() as any;
  }

  getRawBuffer(): Buffer {
    return this._buffer;
  }

  setData(newData: D): void {
    this._data = newData;
  }

  getData(): D {
    return this._data;
  }
}
