import * as WebSocket from 'ws';
import ByteBuffer from 'bytebuffer';
import { mergeMap, filter } from 'rxjs/operators';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { MessageMappingProperties } from '@nestjs/websockets';
import {
  WebSocketAdapter as BaseWebSocketAdapter,
  INestApplicationContext,
} from '@nestjs/common';
import { MessagingInternalEvent } from '@envy/lib-client';

export class WebSocketAdapter implements BaseWebSocketAdapter {
  constructor(private app: INestApplicationContext) { }

  create(port: number, options: any = {}): any {
    return new WebSocket.Server({ port, ...options });
  }

  bindClientConnect(server: any, callback: Function) {
    server.on('connection', callback);
  }

  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>
  ) {
    fromEvent(client, 'message')
      .pipe(
        mergeMap(data => this.bindMessageHandler(data, handlers, process)),
        filter(result => result)
      )
      .subscribe(response => client.send(JSON.stringify(response)));
  }

  bindMessageHandler(
    buffer: any,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>
  ): Observable<any> {
    const parsedBuffer = ByteBuffer.fromBinary(buffer.data);
    const length = parsedBuffer.readInt();
    const header = parsedBuffer.readShort();
    parsedBuffer.reset();
    const data = parsedBuffer.readBytes(length).toString('utf8');
    const matchingInternalEvent = MessagingInternalEvent[MessagingInternalEvent[header] as any];
    if (!matchingInternalEvent) {
      throw new Error(`${header} is not a supported packet`);
    }
    const messageHandler = handlers.find(
      handler => handler.message === matchingInternalEvent
    );
    if (!messageHandler) {
      return EMPTY;
    }
    return process(messageHandler.callback(data));
  }

  close(server: any) {
    server.close();
  }
}
