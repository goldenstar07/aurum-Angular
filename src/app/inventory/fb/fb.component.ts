import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
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
  selector: 'app-fb',
  templateUrl: './fb.component.html',
  styleUrls: ['./fb.component.scss']
})
export class FbComponent extends InventoryManeger implements OnInit {
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
      if(!this.inventoryItems) {
        return;
      }
      this.inventoryItems = this.inventoryItems.data;
      this.inventoryLabels = [];
      this.getDates(this.inventoryItems.fb[Object.keys(this.inventoryItems.fb)[0]]);
      this.getLabels(this.inventoryItems.fb);
    });

    this.form = this.formBuilder.group({
      date: [''],
      inventories: this.formBuilder.array([this.createFormInput()])
    });
    console.log(this.form);
  }
updateItem() {
  console.log(this.inventoryItems.fb);
   this.sortByDate();
    this.addItem(this.inventoryItems.fb, localStorage.hotelId);
  
}
  addItem(item,hotelId){
    this.inventoryService.addFb(item, hotelId);
  }

  saveFormInput() {

    if(!this.inventoryItems) {
      this.inventoryItems = {
        fb: {}
      };
      this.inventoryDates = [];
      this.inventoryService.addNewField();
    }

    if(!this.inventoryItems.fb[Object.keys(this.inventoryItems.fb)[0]]) {
      this.inventoryDates = [];
    }

    this.form.value.inventories.forEach(item => {
      if (!this.inventoryItems.fb[item.item]) this.addNewItem(item.item);
    });


    let date = this.form.value.date ? this.datePipe.transform(this.form.value.date, 'MM/dd/yyyy') : this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    let indexOfItem = this.checkIfDateExist(date);



    if (indexOfItem == -1) {
      this.addNewDate(date);
      indexOfItem = this.inventoryDates.length - 1;
    }

    this.form.value.inventories.forEach(item => {
      this.inventoryItems.fb[item.item][indexOfItem].need = item.need;
      this.inventoryItems.fb[item.item][indexOfItem].have = item.have;
    });

    this.inventoryDates.sort((a, b) => +new Date(b) - +new Date(a));

    this.sortByDate();
    this.addItem(this.inventoryItems.fb, localStorage.hotelId);
  }
  addNewItem(name) {
    this.inventoryItems.fb[name] = [];
    this.inventoryDates.forEach(date => {
      this.inventoryItems.fb[name].push({
        date: date,
        have: "",
        need: ""
      })
    })
  }

  addNewDate(date) {
    this.inventoryDates.push(date)
    for (let key in this.inventoryItems.fb) {
      this.inventoryItems.fb[key].push({
        date: date,
        have: "",
        need: ""
      })
    }
  }
  updateRooms() {
    this.addItem(this.inventoryItems.fb, localStorage.hotelId);
  }

  sortByDate() {
    for (let key in this.inventoryItems.fb) {
      this.inventoryItems.fb[key].sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }
    this.getDates(this.inventoryItems.fb[Object.keys(this.inventoryItems.fb)[0]]);
  }

  updateItemsByType() {
    this.currentItem = this.inventoryItems.fb[this.nameOfItem];
  }
  archiveRow() {
    if (localStorage.getItem('table') != null) {
        // document.getElementsByTagName('input').checked = localStorage.getItem('table');
        console.log('archive row');

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
arr.push(checkboxes[i].checked = true);
    } else {
arr.push(checkboxes[i].checked=false);
}
    }localStorage.setItem('table', JSON.stringify(arr));
    console.log('saved states of check boxes',arr);
}

}



