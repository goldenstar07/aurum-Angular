import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
/*Interfaces */
import {Transaction} from "../interfaces/transaction";
// Services
import {TransactionService} from '../services/transaction.service';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import * as firebase from "firebase/app";
import {DatePipe} from "@angular/common";
import {HelperService} from "../../shared/services/helper.service";
/*import Transaction = firebase.firestore.Transaction;*/


@Component({
  selector: 'app-transactions-date',
  templateUrl: './transactions-date.component.html',
  styleUrls: ['./transactions-date.component.scss']
})
export class TransactionsDateComponent implements OnInit {
    public archiveToggle = true;

  closeResult: string;
  form: FormGroup;


  inventoryItems: any;
  inventoryLabels: Array<any>;
  inventoryDates: Array<any>;

  hotelId: string;

  dateOfItem: any;
  dateIndex: any;
  nameOfItem: any;
  dateFrom: any;
  dateTo: any;

  byDate: boolean;
  byType: boolean;

  currentItem: any;

  constructor(public modalService: NgbModal,
              public formBuilder: FormBuilder,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              public datePipe: DatePipe,
              public transactionService: TransactionService) {

    this.dateIndex = 0;
    this.byDate = false;
    this.byType = false;
  }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(res => {
      this.inventoryItems = HelperService.getItemsByHotelId(res);
      if(!this.inventoryItems) {
        return;
      }
      this.inventoryItems = this.inventoryItems.data;
      this.inventoryLabels = [];
      this.getDates(this.inventoryItems[Object.keys(this.inventoryItems)[0]]);
      this.getLabels(this.inventoryItems);
    });

    this.form = this.formBuilder.group({
      date: [''],
      inventories: this.formBuilder.array([this.createFormInput()])
    });
    console.log(this.form);
  }

  addItem(item,hotelId){
    this.transactionService.addTransaction(item, hotelId);
  }

  saveFormInput() {
    if(!this.inventoryItems) {
      this.inventoryItems = {};
      this.inventoryDates = [];
      // this.transactionService.addNewField();
    }

    if(!this.inventoryItems[Object.keys(this.inventoryItems)[0]]) {
      this.inventoryDates = [];
    }

    this.form.value.inventories.forEach(item => {
      if (!this.inventoryItems[item.item]) this.addNewItem(item.item);
    });


    let date = this.form.value.date ? this.datePipe.transform(this.form.value.date, 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let indexOfItem = this.checkIfDateExist(date);



    if (indexOfItem == -1) {
      this.addNewDate(date);
      indexOfItem = this.inventoryDates.length - 1;
    }

    this.form.value.inventories.forEach(item => {
      this.inventoryItems[item.item][indexOfItem].price = item.price;
    });

    this.inventoryDates.sort((a, b) => +new Date(b) - +new Date(a));

    this.sortByDate();
    this.addItem(this.inventoryItems, localStorage.hotelId);
  }
  addNewItem(name) {
    this.inventoryItems[name] = [];
    this.inventoryDates.forEach(date => {
      this.inventoryItems[name].push({
        date: date,
        price: ""
      })
    })
  }

  addNewDate(date) {
    this.inventoryDates.push(date)
    for (let key in this.inventoryItems) {
      this.inventoryItems[key].push({
        date: date,
        price: ""
      })
    }
  }
  updateRooms() {
    this.addItem(this.inventoryItems, localStorage.hotelId);
  }
updateItem() {
   this.sortByDate();
    this.addItem(this.inventoryItems, localStorage.hotelId);
}
  sortByDate() {
    for (let key in this.inventoryItems) {
      this.inventoryItems[key].sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }
    this.getDates(this.inventoryItems[Object.keys(this.inventoryItems)[0]]);
  }

  updateItemsByType() {
    this.currentItem = this.inventoryItems[this.nameOfItem];
  }


  createFormInput(): FormGroup {
    return this.formBuilder.group({
      item: '',
      price: ''
    });
  }

  getLabels(items) {
    for (let key in items) {
      this.inventoryLabels.push(key);
    }
  }

  checkIfDateExist(date) {
    return this.inventoryDates.indexOf(date);
  }

  getDates(dates) {
    if(!dates) return;
    this.dateFrom = dates[dates.length -1].date;
    this.dateTo = dates[0].date;
    this.inventoryDates = [];
    dates.forEach(item => {
      this.inventoryDates.push(item.date);
    });
  }

// FILTER
  updateItemsByDate() {
    this.dateIndex = this.inventoryDates.indexOf(this.dateOfItem);
  }


  changeTable(type) {
    switch (type) {
      case "date":
        this.byDate = true;
        this.byType = false;
        break;
      case "type":
        this.byDate = false;
        this.byType = true;
    }
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
  archiveRow() {
    if(localStorage.getItem('table')!= null){
        document.getElementsByTagName('input[type=checkbox]').checked = localStorage.getItem('table');

    }  
    let checkboxes = document.getElementsByTagName('input');

    let arr = [];

console.log('reloaded checkboxes', checkboxes);
//  let checkboxes = document.getElementsByTagName('input');
    for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked === true) {
     let table = <HTMLElement>document.getElementById('table');
      checkboxes[i].closest('tr').classList.add('archive');
      table.appendChild(checkboxes[i].closest('tr'));
arr.push(checkboxes[i].checked=true);
    } else {
arr.push(checkboxes[i].checked=false);
}
    }localStorage.setItem('table', JSON.stringify(arr));
    console.log('saved states of check boxes',arr);
}

}
