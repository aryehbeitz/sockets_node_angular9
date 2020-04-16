import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Message } from './models/message';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // todo: token from user
  public myWebSocket: WebSocketSubject<any> = webSocket(`${environment.socketServerUrl}/?token=aryeh_token`);

  constructor() {
    this.myWebSocket.subscribe(message => {
      console.log(message);
    });
  }

  public sendMessage(message) {
    this.myWebSocket.next({ message });
    console.log('sending message', message);
  }
}
