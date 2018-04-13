import { Component, OnInit } from '@angular/core';
/*Services*/
import { ChatService } from "../chat.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  message: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  send(form: NgForm) {
    alert(form);
    /*this.chatService.sendMessage(this.message);
    this.message = '';*/
  }

  /*handleSubmit(event) {
    if(event.keyCode === 13) {
      this.send();
    }
  }*/

}
