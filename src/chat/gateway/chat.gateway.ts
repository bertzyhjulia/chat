import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'http';
import { from, map, Observable } from 'rxjs';
import { Message } from '../model/message.entity';
import { ChatService } from '../service/chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
    handleSendMessage(@ConnectedSocket() client: any, payload: Message) {
    console.log('payload   ' + payload.text);
     this.chatService.createMessage(payload);
    this.server.emit('recMessage', payload);
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
