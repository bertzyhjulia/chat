import {
    ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';
import { Message } from './chat/model/message.entity';
import { ChatService } from './chat/service/chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('event')
  test(@ConnectedSocket() client: any, @MessageBody() data: string) {
  console.log('payload   ' +data);
  this.server.emit('recMessage', data);
}

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected:`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected `);
  }
}
