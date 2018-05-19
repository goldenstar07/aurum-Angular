import {Component, OnInit, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {NgStyle, CommonModule} from '@angular/common';
import {Observable} from "rxjs/Observable";
import {NgxAutoScroll} from "ngx-auto-scroll";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";
import {FormBuilder, NgForm} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
// Interfaces
import {Bill} from "../../upload/interfaces/bill";
import {Hotel} from '../../hotels/interfaces/hotel';
// Service
import {ActivityChatService} from './service/activity-chat.service';
import {Message} from './models/Message';
import {DataProcessingService} from '../../shared/services/data-processing.service';
import {DataStorageService} from '../../shared/services/data-storage.service';

@Component({
  selector: 'app-activity-chat',
  templateUrl: './activity-chat.component.html',
  styleUrls: ['./activity-chat.component.scss']
})
export class ActivityChatComponent implements OnInit {

  // Bug with scrollDown

  // @ViewChild('scroller') private feedContainer: ElementRef;
  @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;

  messages: any;
  text: string;
  author: string;
  date: string;
  hotelId: any;
  managerId: any;
  objectOfMAnager: any;
  hotel: Observable<Hotel>;
  checker: boolean

  constructor(private chatService: ActivityChatService,
              public dataProcessingService: DataProcessingService,
              public dataStorage: DataStorageService,
              private afs: AngularFirestore,
              private formBuilder: FormBuilder) {
    IntervalObservable.create(200).subscribe(() => {

    });
  }

  onKey(form: NgForm): void {
    this.hotelId = localStorage.hotelId;
    this.managerId = localStorage.user;
    this.objectOfMAnager = this.dataStorage.getUser();
    form.value.managerId = this.objectOfMAnager.name;
    form.value.htId = this.hotelId;
    const msg = {
        ...form.value,
      idOsManager: this.objectOfMAnager.id,
    };
    console.log(form.value);
    this.chatService.sendMessage(msg);
    console.log(form.value);
    // AddVendors
    form.resetForm();
  }

  ngOnInit() {
    this.checker = false;
    this.chatService.getMessages().subscribe(res => {
      this.messages = this.dataProcessingService.createArrayOfItemsbyHotelId2(res);
      this.messages.sort((a, b) => +new Date(a.data.date) - +new Date(b.data.date));
    });
  }

  public forceScrollDown(): void {
    this.ngxAutoScroll.forceScrollDown();
  }

  checkMessagePosition(id) {
    if(id == this.chatService.getUserId()) {
      return true;
    } else {
      return false;
    }
  }

  // checkOrder(index) {
  //   debugger
  //   if (index - 1 >= 0) {
  //     if (this.messages[index].data.managerId !== this.messages[index - 1].data.managerId) {
  //       this.checker = true;
  //     }
  //   }
  //   return this.checker;
  // }

  // ngAfterViewChecked():void{
  //   this.feedContainer.nativeElement.scrollTop =
  //     this.feedContainer.nativeElement.scrollHeight;
  // }
}
