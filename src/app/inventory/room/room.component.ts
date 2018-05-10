import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
import {FormArray, FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {InventoryService} from "../services/inventory.service";
import {DatePipe} from "@angular/common";
import {InventoryManeger} from "../../shared/classes/InventoryMenager"
import {HelperService} from "../../shared/services/helper.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent extends InventoryManeger implements OnInit {

  constructor(public modalService: NgbModal,
              public formBuilder: FormBuilder,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              public inventoryService: InventoryService,
              public datePipe: DatePipe) {
    super(modalService, formBuilder, dataProcessingService, dataStorageService, datePipe);
  }


  ngOnInit() {
    this.inventoryService.getInventories().subscribe(res => {
      this.inventoryItems = HelperService.getItemsByHotelId(res);
      if(!this.inventoryItems) {
        return;
      }
      this.inventoryItems = this.inventoryItems.data;
      this.inventoryLabels = [];
      this.getDates(this.inventoryItems.room[Object.keys(this.inventoryItems.room)[0]]);
      this.getLabels(this.inventoryItems.room);
    });

    this.form = this.formBuilder.group({
      date: [''],
      inventories: this.formBuilder.array([this.createFormInput()])
    });
    console.log(this.form);
  }

  addItem(item,hotelId){
    this.inventoryService.addRoom(item, hotelId);
  }

  saveFormInput() {
    if(!this.inventoryItems) {
      this.inventoryItems = {
        room: {}
      };
      this.inventoryDates = [];
      this.inventoryService.addNewField();
    }

    if(!this.inventoryItems.room[Object.keys(this.inventoryItems.room)[0]]) {
      this.inventoryDates = [];
    }

    this.form.value.inventories.forEach(item => {
      if (!this.inventoryItems.room[item.item]) this.addNewItem(item.item);
    });


    let date = this.form.value.date ? this.datePipe.transform(this.form.value.date, 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let indexOfItem = this.checkIfDateExist(date);



    if (indexOfItem == -1) {
      this.addNewDate(date);
      indexOfItem = this.inventoryDates.length - 1;
    }

    this.form.value.inventories.forEach(item => {
      this.inventoryItems.room[item.item][indexOfItem].need = item.need;
      this.inventoryItems.room[item.item][indexOfItem].have = item.have;
    });

    this.inventoryDates.sort((a, b) => +new Date(b) - +new Date(a));

    this.sortByDate();
    this.addItem(this.inventoryItems.room, localStorage.hotelId);
  }
  addNewItem(name) {
    this.inventoryItems.room[name] = [];
    this.inventoryDates.forEach(date => {
      this.inventoryItems.room[name].push({
        date: date,
        have: "",
        need: ""
      })
    })
  }

  addNewDate(date) {
    this.inventoryDates.push(date)
    for (let key in this.inventoryItems.room) {
      this.inventoryItems.room[key].push({
        date: date,
        have: "",
        need: ""
      })
    }
  }
  updateRooms() {
    this.addItem(this.inventoryItems.room, localStorage.hotelId);
  }

  sortByDate() {
    for (let key in this.inventoryItems.room) {
      this.inventoryItems.room[key].sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }
    this.getDates(this.inventoryItems.room[Object.keys(this.inventoryItems.room)[0]]);
  }

  updateItemsByType() {
    this.currentItem = this.inventoryItems.room[this.nameOfItem];
  }

}



