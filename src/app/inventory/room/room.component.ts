import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
import {FormArray, FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {RoomService} from "../services/room.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  closeResult: string;
  form: FormGroup;

  roomItems: any;
  roomLabels: Array<any>;
  roomDates: any;

  hotelId: string;

  dateOfItem: any;
  dateIndex: any;
  nameOfItem: any;
  dateFrom: any;
  dateTo: any;

  byDate: boolean;
  byType: boolean;

  constructor(private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private afs: AngularFirestore,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              private roomService: RoomService,
              private datePipe: DatePipe) {
  }


  ngOnInit() {
    this.byDate = false;
    this.byType = false;

    this.roomService.getRooms().subscribe(res => {
      this.roomItems = res[0].data;
      this.roomLabels = [];
      this.getDates(this.roomItems.room[Object.keys(this.roomItems.room)[0]]);
      this.getLabels(this.roomItems.room);
    });

    this.form = this.formBuilder.group({
      date: [''],
      rooms: this.formBuilder.array([this.createFormInput()])
    });
    console.log(this.form);
  }

  createFormInput(): FormGroup {
    return this.formBuilder.group({
      item: '',
      have: '',
      need: ''
    });
  }

  addFormInput() {
    const room = this.createFormInput();
    this.rooms.push(room);
  }

  get rooms(): FormArray {
    return this.form.get('rooms') as FormArray;
  }

  saveFormInput() {

    this.form.value.rooms.forEach(item => {
      if (!this.roomItems.room[item.item]) this.addNewItem(item.item);
    });


    let date = this.form.value.date ? this.datePipe.transform(this.form.value.date, 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let indexOfItem = this.checkIfDateExist(date);


    if (indexOfItem == -1) {
      this.addNewDate(date);
      indexOfItem = this.roomDates.length - 1;
    }

    this.form.value.rooms.forEach(item => {
      this.roomItems.room[item.item][indexOfItem].need = item.need;
      this.roomItems.room[item.item][indexOfItem].have = item.have;
    });

    this.roomDates.sort((a, b) => +new Date(b) - +new Date(a));

    this.sortByDate();
    this.roomService.addRoom(this.roomItems.room, localStorage.hotelId);
  }

  openNewProperty(contentNewProperty) {
    this.modalService.open(contentNewProperty).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getDates(dates) {
    this.roomDates = [];
    dates.forEach(item => {
      this.roomDates.push(item.date);
    });
  }


  getLabels(items) {
    for (let key in items) {
      this.roomLabels.push(key);
    }
  }

  checkIfDateExist(date) {
    return this.roomDates.indexOf(date);
  }

  addNewItem(name) {
    this.roomItems.room[name] = [];
    this.roomDates.forEach(date => {
      this.roomItems.room[name].push({
        date: date,
        have: "",
        need: ""
      })
    })
  }

  addNewDate(date) {
    this.roomDates.push(date)
    for (let key in this.roomItems.room) {
      this.roomItems.room[key].push({
        date: date,
        have: "",
        need: ""
      })
    }
  }

  updateRooms() {
    this.roomService.addRoom(this.roomItems.room, localStorage.hotelId);
  }

  sortByDate() {
    for (let key in this.roomItems.room) {
      this.roomItems.room[key].sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }
    this.getDates(this.roomItems.room[Object.keys(this.roomItems.room)[0]]);
  }

// FILTER
  updateItemsByDate() {
  this.dateIndex = this.roomDates.indexOf(this.dateOfItem);
  }

  updateItemsByType() {
    this.dateFrom;
    this.dateTo;
    debugger
  }

  changeTable() {
    this.byDate = !this.byDate;
    this.byType = !this.byType;
  }

}
