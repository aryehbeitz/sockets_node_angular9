import { Injectable } from '@angular/core';
import { Message } from './models/message';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:3000');

  constructor() {
    this.myWebSocket.subscribe(message => {
      console.log(message);
    })
  }

  public sendMessage(message) {
    this.myWebSocket.next({ message })
    console.log('sending message', message)
  }
}