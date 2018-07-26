import {FormArray, FormBuilder, FormGroup, Form} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DataProcessingService} from "../services/data-processing.service";
import {DataStorageService} from "../services/data-storage.service";
import {DatePipe} from "@angular/common";
/**
 * Created by User1 on 04.05.2018.
 */


export class InventoryManeger {
  closeResult: string;
  form: FormGroup ;


  inventoryItems: any;
  inventoryLabels: Array<any>;
  inventoryDates: Array<any>;
  selectedDate: number;

  hotelId: string;

  dateOfItem: any;
  dateIndex: any;
  nameOfItem: any;
  dateFrom: any;
  dateTo: any;

  byDate: boolean;
  byType: boolean;

  currentItem: any;
  addNewInventoryModalRef: any;
  currentEditingColNumber: number;
 
  constructor(public modalService: NgbModal,
              public formBuilder: FormBuilder,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              public datePipe: DatePipe) {
    this.selectedDate = -1;
    this.dateIndex = 0;
    this.byDate = false;
    this.byType = false;
    this.currentEditingColNumber = -1;
  }


  createFormInput(): FormGroup {
    return this.formBuilder.group({
      item: '',
      have: '',
      need: ''  
    });
  }

  setCurrentEditingColNumber(i){
    this.currentEditingColNumber = i;
  }
  addFormInput() {
    let inventory = this.createFormInput();
    this.inventories.push(inventory);
  }

  get inventories(): FormArray {
    return this.form.get('inventories') as FormArray;
  }

  openNewProperty(contentNewProperty) {
    this.addNewInventoryModalRef = this.modalService.open(contentNewProperty);
    this.addNewInventoryModalRef.result.then((result) => {
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

  getDates(_dates) {
    if(!_dates) return;
    let dates = _dates.data
    this.dateFrom = dates[dates.length -1].date;
    this.dateTo = dates[0].date;
    this.inventoryDates = [];
    dates.forEach(item => {
      this.inventoryDates.push(item.date);
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


  addItem(item,hotelId){

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
}
