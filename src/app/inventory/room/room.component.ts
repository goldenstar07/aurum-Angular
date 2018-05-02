import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
import {FormArray, FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import * as firebase from "firebase/app";
// Interfaces
import { Inventory } from "../interface/inventory";
// Services
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import { RoomService } from "../services/room.service";

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

  constructor(private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private afs: AngularFirestore,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              private roomService: RoomService) { }


  ngOnInit() {
    this.roomService.getRooms().subscribe(res => {
      this.roomItems = res[0].data;
      this.roomLabels = [];
      this.getDates(this.roomItems.room[Object.keys(this.roomItems.room)[0]])
      for (let key in this.roomItems.room) {
        this.roomLabels.push(key);
      }
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

  findIndexOfDate(){
    this.roomDates.findIndex(el => el.getTime);
  }

  saveFormInput() {
    this.form.value.date;
    this.form.value.rooms.forEach(item => {
      if(!this.roomItems.room[item.item]) this.roomItems.room[item.item] = [];
      this.roomItems.room[item.item].push({
        date: this.form.value.date || new Date(),
        have: item.have,
        need: item.need
      });
    });
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
      return  `with: ${reason}`;
    }
  }

  getDates(dates) {
    this.roomDates = dates.map(item => item.date);
  }


}
