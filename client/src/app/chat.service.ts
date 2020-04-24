import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Message } from './models/message';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { retryWhen } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userData = {
    user_id: 23452345,
    user_uuid: 'sadfasdfasdf'
  };
  pingTimeout: any;
  // todo: token from user
  myWebSocket: WebSocketSubject<any> = webSocket(`${environment.socketServerUrl}/?token=${JSON.stringify(this.userData)}`);

  constructor() {}

  public sendMessage(message) {
    this.myWebSocket.next({ message });
    console.log('sending message', message);
  }
}
