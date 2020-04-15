import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public newMessage: string;
  public messageList: string[] = [];

  constructor(private chatService: ChatService) {
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  ngOnInit() {
    this.chatService.myWebSocket.subscribe(messageObj => {
      this.messageList.push(messageObj.message);
    });
  }
}