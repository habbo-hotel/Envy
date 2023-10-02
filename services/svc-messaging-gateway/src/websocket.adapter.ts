import * as WebSocket from 'ws';
import ByteBuffer from 'bytebuffer';
import {mergeMap, filter} from 'rxjs/operators';
import {Observable, fromEvent, EMPTY} from 'rxjs';
import {MessageMappingProperties} from '@nestjs/websockets';
import {
  MessagingGatewayClientService,
  MessagingInternalEvent,
} from '@envy/lib-client';
import {
  WebSocketAdapter as BaseWebSocketAdapter,
  INestApplicationContext,
} from '@nestjs/common';

export class WebSocketAdapter implements BaseWebSocketAdapter {
  private messagingGatewayClient!: MessagingGatewayClientService;

  constructor(private app: INestApplicationContext) {
    app
      .resolve<MessagingGatewayClientService>(MessagingGatewayClientService)
      .then(messagingGatewayClient => {
        this.messagingGatewayClient = messagingGatewayClient;
      });
  }

  create(port: number, options: any = {}): any {
    return new WebSocket.Server({port, ...options});
  }

  bindClientConnect(server: any, callback: Function) {
    server.on('connection', callback);
  }

  bindMessageHandlers = (
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>
  ) => {
    fromEvent(client, 'message')
      .pipe(
        mergeMap(data => this.bindMessageHandler(data, handlers, process)),
        filter(result => result)
      )
      .subscribe(response => client.send(JSON.stringify(response)));
  };

  bindMessageHandler = async (
    buffer: any,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>
  ): Promise<any> => {
    const parsedBuffer = ByteBuffer.fromBinary(buffer.data);
    const length = parsedBuffer.readInt();
    const header = parsedBuffer.readShort();
    parsedBuffer.reset();
    const data = parsedBuffer.readBytes(length).toString('utf8');
    // @ts-ignore
    const matchingInternalEvent: MessagingInternalEvent =
      MessagingInternalEvent[MessagingInternalEvent[header]];
    if (!matchingInternalEvent) {
      throw new Error(`${header} is not a supported packet`);
    }
    await this.messagingGatewayClient._onMessageReceived({
      event: matchingInternalEvent,
      data,
    });
  };

  close(server: any) {
    server.close();
  }
}
