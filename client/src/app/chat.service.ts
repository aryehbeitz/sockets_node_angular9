import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Message } from './models/message';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { retryWhen } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

interface WebSocketMessage {
  message: string;
  user_id: number;
  user_uuid: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userData = {
    user_id: 23452345,
    user_uuid: uuidv4()
  };
  pingTimeout: ReturnType<typeof setTimeout> | null = null;
  myWebSocket: WebSocketSubject<WebSocketMessage> = webSocket<WebSocketMessage>(`${environment.socketServerUrl}/?token=${JSON.stringify(this.userData)}`);

  constructor() {}

  public sendMessage(message: string): void {
    this.myWebSocket.next({
      message,
      user_id: this.userData.user_id,
      user_uuid: this.userData.user_uuid
    });
    console.log('sending message', message);
  }
}
