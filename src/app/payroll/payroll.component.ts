import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map';
import {FormArray, FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
/*Interfaces */
import { Payroll } from './interface/payroll';
import {Hotel} from '../hotels/interfaces/hotel';
// Services
import {DataProcessingService} from '../shared/services/data-processing.service';
import {DataStorageService} from '../shared/services/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {InventoryService} from '../inventory/services/inventory.service';
import { PayrollManager } from '../shared/classes/PayrollManager';
import {HelperService} from '../shared/services/helper.service';


@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent extends PayrollManager implements OnInit {
     public archiveToggle = true;
   @ViewChild('checkMe') checkMe: ElementRef;
     @ViewChild('fname') fname: ElementRef;
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
      if (!this.inventoryItems) {
        return;
      }
     
     
      this.inventoryItems = this.inventoryItems.data;
      this.inventoryLabels = [];
      this.getDates(this.inventoryItems.payroll[Object.keys(this.inventoryItems.payroll)[0]]);
      this.getLabels(this.inventoryItems.payroll);
    });

    this.form = this.formBuilder.group({
      date: [''],
      inventories: this.formBuilder.array([this.createFormInput()])
    });
    console.log(this.form);
  }

  addItem(item, hotelId) {
    this.inventoryService.addPayroll(item, hotelId);
  }

  saveFormInput() {
    if (!this.inventoryItems) {
      this.inventoryItems = {
        payroll: {}
      };
      this.inventoryDates = [];
      this.inventoryService.addNewField();
    }

    if(!this.inventoryItems.payroll[Object.keys(this.inventoryItems.payroll)[0]]) {
      this.inventoryDates = [];
    }
    this.form.value.inventories.forEach(item => {
      if (!this.inventoryItems.payroll[item.item]) this.addNewItem(item.item);
    });


    let date = this.form.value.date ? this.datePipe.transform(this.form.value.date, 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'MM-dd-YYYY');
    let indexOfItem = this.checkIfDateExist(date);



    if (indexOfItem == -1) {
      this.addNewDate(date);
      indexOfItem = this.inventoryDates.length - 1;
    }

    this.form.value.inventories.forEach(item => {
      this.inventoryItems.payroll[item.item][indexOfItem].rt = item.rt;
      this.inventoryItems.payroll[item.item][indexOfItem].ot = item.ot;
      this.inventoryItems.payroll[item.item][indexOfItem].dt = item.dt;
      this.inventoryItems.payroll[item.item][indexOfItem].mt = item.mt;
    });

    this.inventoryDates.sort((a, b) => +new Date(b) - +new Date(a));

    this.sortByDate();

       //to reset all add this code  
  // this.addItem({
  //        'carolina': [{'date': '2018-06-01', rt: '1', ot: '8',dt: '1', mt: '8'},
  //         {'date': '2018-05-01', rt: '1', ot: '8',dt: '1', mt: '8'}]}, localStorage.hotelId);
    this.addItem(this.inventoryItems.payroll, localStorage.hotelId);
  }
  addNewItem(name) {
    this.inventoryItems.payroll[name] = [];
    this.inventoryDates.forEach(date => {
      this.inventoryItems.payroll[name].push({
        date: date,
        rt: "",
        ot: "",
        dt: "",
        mt: ""
      })
    })
  }

updateItem() {
   this.sortByDate();
    this.addItem(this.inventoryItems.payroll, localStorage.hotelId);
  
}
  addNewDate(date) {
    this.inventoryDates.push(date)
    for (let key in this.inventoryItems.payroll) {
      this.inventoryItems.payroll[key].push({
        date: date,
        rt: "",
        ot: "",
        dt: "",
        mt: ""
      })
    }
  }
  updateRooms() {
    this.addItem(this.inventoryItems.payroll, localStorage.hotelId);
  }

  sortByDate() {
    for (let key in this.inventoryItems.payroll) {
      this.inventoryItems.payroll[key].sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }
    this.getDates(this.inventoryItems.payroll[Object.keys(this.inventoryItems.payroll)[0]]);
  }

  updateItemsByType() {
    this.currentItem = this.inventoryItems.payroll[this.nameOfItem];
  }
  archiveRow() {
    if(localStorage.getItem('table')!= null){
       document.getElementsByTagName('input').checked = localStorage.getItem('table');

    }  
    let checkboxes =  document.getElementsByTagName('input');

    let arr = [];

console.log('reloaded checkboxes',checkboxes);
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



