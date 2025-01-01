import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Message } from './models/message';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { retryWhen } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

interface WebSocketMessage {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userData = {
    user_id: 23452345,
    user_uuid: 'sadfasdfasdf'
  };
  pingTimeout: ReturnType<typeof setTimeout> | null = null;
  myWebSocket: WebSocketSubject<WebSocketMessage> = webSocket<WebSocketMessage>(`${environment.socketServerUrl}/?token=${JSON.stringify(this.userData)}`);

  constructor() {}

  public sendMessage(message: string): void {
    this.myWebSocket.next({ message });
    console.log('sending message', message);
  }
}
