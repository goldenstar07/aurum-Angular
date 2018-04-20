import {Component, OnInit, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';

//Service
import {ActivityChatService} from "./service/activity-chat.service";
import {Message} from "./models/Message";
import {FormBuilder, NgForm} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {Hotel} from "../../hotels/interfaces/hotel";

@Component({
  selector: 'app-activity-chat',
  templateUrl: './activity-chat.component.html',
  styleUrls: ['./activity-chat.component.scss']
})
export class ActivityChatComponent implements OnInit, AfterViewChecked {

  // Messages are not always sent correctly
  // Bug with scrollDown

  @ViewChild('scroller') private feedContainer: ElementRef;

  messages: any;

  // mid:string;
  text: string;
  author: string;
  date: string;
  hotelId: any;

  constructor(private chatService: ActivityChatService,
              public dataProcessingService: DataProcessingService,
              private afs: AngularFirestore,
              private formBuilder: FormBuilder) { }

  onKey(form: NgForm): void {
    this.hotelId = localStorage.hotelId;
    form.value.htId = this.hotelId;
    this.chatService.sendMessage(form.value); //AddVendors
    form.resetForm();
  }


  ngOnInit() {
    this.messages = this.chatService.getMessages();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop =
      this.feedContainer.nativeElement.scrollHeight;
  }
}
