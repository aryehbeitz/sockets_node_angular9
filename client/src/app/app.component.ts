import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service'
import { retryWhen } from 'rxjs/operators';
import { tap, delay } from 'rxjs/operators';

interface DisplayMessage {
  message: string;
  user_id: number;
  user_uuid: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public newMessage: string = '';
  public messageList: DisplayMessage[] = [];

  constructor(private chatService: ChatService) {
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  ngOnInit() {
    this.chatService.myWebSocket.pipe(
      retryWhen(errors =>
        errors.pipe(
          tap(err => {
            console.error('Got error', err);
          }),
          delay(1000)
        )
      )
    ).subscribe((messageObj: DisplayMessage) => {
      this.messageList.push(messageObj);
    });
  }
}