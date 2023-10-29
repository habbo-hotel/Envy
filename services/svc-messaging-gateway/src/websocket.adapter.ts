import * as WebSocket from 'ws';
import ByteBuffer from 'bytebuffer';
import {Observable, fromEvent} from 'rxjs';
import {LoggerService} from '@envy/lib-api';
import {mergeMap, filter} from 'rxjs/operators';
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

  constructor(
    app: INestApplicationContext,
    private readonly loggerService: LoggerService
  ) {
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
    this.loggerService.log(`Handling message from client ${client.id}`);
    fromEvent(client, 'message')
      .pipe(
        mergeMap(data =>
          this.bindMessageHandler(client, data, handlers, process)
        ),
        filter(result => result)
      )
      .subscribe(response => client.send(JSON.stringify(response)));
  };

  bindMessageHandler = async (
    client: WebSocket,
    buffer: any,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>
  ): Promise<any> => {
    this.loggerService.log(`Processing message from client ${client.id}`);
    const parsedBuffer = ByteBuffer.fromBinary(buffer.data);
    const length = parsedBuffer.readInt();
    const header = parsedBuffer.readShort();
    parsedBuffer.reset();
    const data = parsedBuffer.readBytes(length).toString('utf8');
    const matchingInternalEvent: MessagingInternalEvent =
      // @ts-ignore
      MessagingInternalEvent[MessagingInternalEvent[header]];
    if (!matchingInternalEvent) {
      throw new Error(`${header} is not a supported packet`);
    }
    await this.messagingGatewayClient._onMessageReceived({
      clientID: client.id,
      event: matchingInternalEvent,
      data,
    });
  };

  close(server: any) {
    server.close();
  }
}
