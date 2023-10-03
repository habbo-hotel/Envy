import {Server} from 'ws';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import ByteBuffer from 'bytebuffer';
import {BadRequestException} from '@nestjs/common';

@WebSocketGateway({port: 2096, transports: ['websocket']})
export class MessagingGatewayProvider
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  private server!: Server;

  private wsClients: any[] = [];

  afterInit() {
    this.server.emit('testing', {do: 'stuff'});
  }

  handleConnection(client: any) {
    this.wsClients.push(client);
  }

  handleDisconnect(client: any) {
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    this.broadcast('disconnect', {});
  }

  broadcast(event: any, message: any) {
    console.log(event, message);
    const newEvent = new ByteBuffer();
    newEvent.writeShort(event);
    newEvent.writeInt(newEvent.buffer.length);
    for (const c of this.wsClients) {
      c.send(newEvent.buffer);
    }
  }

  send(clientID: number, event: any, message: any) {
    const matchingClient = this.wsClients.find(_ => _.id === clientID);
    if (!matchingClient) {
      throw new BadRequestException();
    }
    const newEvent = new ByteBuffer();
    newEvent.writeShort(event);
    newEvent.writeInt(newEvent.buffer.length);
    matchingClient.send(newEvent.buffer);
  }
}
