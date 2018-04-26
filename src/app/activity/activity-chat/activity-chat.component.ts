import {Component, OnInit, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';

// Service
import {ActivityChatService} from './service/activity-chat.service';
import {Message} from './models/Message';
import {FormBuilder, NgForm} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {DataProcessingService} from '../../shared/services/data-processing.service';
import {Hotel} from '../../hotels/interfaces/hotel';
import {DataStorageService} from '../../shared/services/data-storage.service';

@Component({
  selector: 'app-activity-chat',
  templateUrl: './activity-chat.component.html',
  styleUrls: ['./activity-chat.component.scss']
})
export class ActivityChatComponent implements OnInit {

  // Messages are not always sent correctly
  // Bug with scrollDown

  @ViewChild('scroller') private feedContainer: ElementRef;

  messages: any;

  // mid:string;
  text: string;
  author: string;
  date: string;
  hotelId: any;
  managerId: any;
  objectOfMAnager: any;

  constructor(private chatService: ActivityChatService,
              public dataProcessingService: DataProcessingService,
              public dataStorage: DataStorageService,
              private afs: AngularFirestore,
              private formBuilder: FormBuilder) { }

  onKey(form: NgForm): void {
    this.hotelId = localStorage.hotelId;
    this.managerId = localStorage.user;

    // console.log(form.value);

    this.objectOfMAnager = this.dataStorage.getUser();
    form.value.managerId = this.objectOfMAnager.name;
    // console.log(form.value);
    /*const managerObj = form.value.managerId;*/
    // form.value.author = this.objectOfMAnager;
    form.value.htId = this.hotelId;
    // console.log(form.value);
    this.chatService.sendMessage(form.value); // AddVendors
    form.resetForm();
  }


  ngOnInit() {
    this.messages = this.chatService.getMessages();
  }

  /*ngAfterViewChecked(): void {
    this.scrollToBottom();
  }*/

  /*scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop =
      this.feedContainer.nativeElement.scrollHeight;
  }*/
}
