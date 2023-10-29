import {Server} from 'ws';
import {v4 as uuidv4} from 'uuid';
import ByteBuffer from 'bytebuffer';
import {LoggerService} from '@envy/lib-api';
import {BadRequestException} from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';

@WebSocketGateway({port: 2096, transports: ['websocket']})
export class MessagingGatewayProvider
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  private server!: Server;

  private wsClients: any[] = [];

  constructor(private readonly logger: LoggerService) {}

  afterInit() {
    this.logger.log('initialized websocket server');
    this.server.emit('testing', {do: 'stuff'});
  }

  handleConnection(client: any, {socket}: any) {
    const clientID = uuidv4();
    socket.id = clientID;
    client.id = clientID;
    this.logger.log(`${socket.id} has connected`);
    this.wsClients.push(client);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client ${JSON.stringify(client)} is disconnecting`);
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    this.broadcast('disconnect', {});
  }

  getClientByID(clientID: string): any {
    this.logger.log(`Fetching client ${clientID}`);
    const matchingClient = this.wsClients.find(_ => _.id === clientID);
    if (!matchingClient) {
      throw new Error(`Client ${clientID} not found`);
    }
    return matchingClient;
  }

  broadcast(event: any, message: any) {
    this.logger.log(
      `Broadcasting event ${JSON.stringify(event)} message ${JSON.stringify(
        message
      )} to all clients`
    );
    const newEvent = new ByteBuffer();
    newEvent.writeShort(event);
    newEvent.writeInt(newEvent.buffer.length);
    for (const c of this.wsClients) {
      c.send(newEvent.buffer);
    }
  }

  send(clientID: string, event: any, message: any) {
    this.logger.log(`Sending message ${message} to client ${clientID}`);
    const matchingClient = this.wsClients.find(_ => _.id === clientID);
    if (!matchingClient) {
      this.logger.error(
        `Failed to send message ${message}.  Client ${clientID} not found`
      );
      throw new BadRequestException();
    }
    const newEvent = new ByteBuffer();
    newEvent.writeShort(event);
    newEvent.writeInt(newEvent.buffer.length);
    matchingClient.send(newEvent.buffer);
  }
}
