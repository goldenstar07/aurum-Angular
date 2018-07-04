// import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
// import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
// import {DataProcessingService} from "../services/data-processing.service";
// import {DataStorageService} from "../services/data-storage.service";
// import {DatePipe} from "@angular/common";
// /**
//  * Created by User1 on 04.05.2018.
//  */


// export class HKManager {
//   closeResult: string;
//   form: FormGroup ;


//   inventoryItems: any;
//   inventoryLabels: Array<any>;
//   inventoryDates: Array<any>;
//   selectedDate: number;

//   hotelId: string;

//   dateOfItem: any;
//   dateIndex: any;
//   nameOfItem: any;
//   dateFrom: any;
//   dateTo: any;

//   byDate: boolean;
//   byType: boolean;

//   currentItem: any;

//   constructor(public modalService: NgbModal,
//               public formBuilder: FormBuilder,
//               public dataProcessingService: DataProcessingService,
//               public dataStorageService: DataStorageService,
//               public datePipe: DatePipe) {
//     this.selectedDate = -1;
//     this.dateIndex = 0;
//     this.byDate = false;
//     this.byType = false;
//   }


//   createFormInput(): FormGroup {
//     return this.formBuilder.group({
//       item: '',
//       dnd: '',
//       so: '',
//       co: '',
//       time: '',
//       minso: '',
//       minco: '',
//       threshold: '',
//       variance: ''
//     });
//   }

//   addFormInput() {
//     const inventory = this.createFormInput();
//     this.inventories.push(inventory);
//   }

//   get inventories(): FormArray {
//     return this.form.get('inventories') as FormArray;
//   }

//   openNewProperty(contentNewProperty) {
//     this.modalService.open(contentNewProperty).result.then((result) => {
//       this.closeResult = `Closed with: ${result}`;
//     }, (reason) => {
//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//     });
//   }

//   private getDismissReason(reason: any): string {
//     if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//     } else {
//       return `with: ${reason}`;
//     }
//   }

//   getDates(dates) {
//     if(!dates) return;
//     this.dateFrom = dates[dates.length -1].date;
//     this.dateTo = dates[0].date;
//     this.inventoryDates = [];
//     dates.forEach(item => {
//       this.inventoryDates.push(item.date);
//     });
//   }


//   getLabels(items) {
//     for (let key in items) {
//       this.inventoryLabels.push(key);
//     }
//   }

//   checkIfDateExist(date) {
//     return this.inventoryDates.indexOf(date);
//   }


//   addItem(item, hotelId){

//   }



// // FILTER
//   updateItemsByDate() {
//     this.dateIndex = this.inventoryDates.indexOf(this.dateOfItem);
//   }


//   changeTable(type) {
//     switch (type) {
//       case "date":
//         this.byDate = true;
//         this.byType = false;
//         break;
//       case "type":
//         this.byDate = false;
//         this.byType = true;
//     }
//   }
// }
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DataProcessingService} from "../services/data-processing.service";
import {DataStorageService} from "../services/data-storage.service";
import {DatePipe} from "@angular/common";
/**
 * Created by User1 on 04.05.2018.
 */


export class HKManager {
  closeResult: string;
  form: FormGroup ;


  housekeepingItems: any;
  housekeepingLabels: Array<any>;
  housekeepingDates: Array<any>;

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
              public datePipe: DatePipe) {

    this.dateIndex = 0;
    this.byDate = false;
    this.byType = false;
  }


  createFormInput(): FormGroup {
    return this.formBuilder.group({
      item: '',
      dnd: '',
      so: '',
      min: ''
    });
  }

  addFormInput() {
    const housekeeping = this.createFormInput();
    this.housekeepings.push(housekeeping);
  }

  get housekeepings(): FormArray {
    return this.form.get('housekeepings') as FormArray;
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
    this.dateFrom = dates[dates.length -1].date;
    this.dateTo = dates[0].date;
    this.housekeepingDates = [];
    dates.forEach(item => {
      this.housekeepingDates.push(item.date);
    });
  }


  getLabels(items) {
    for (let key in items) {
      this.housekeepingLabels.push(key);
    }
  }

  checkIfDateExist(date) {
    return this.housekeepingDates.indexOf(date);
  }


  addItem(item,hotelId){

  }



// FILTER
  updateItemsByDate() {
    this.dateIndex = this.housekeepingDates.indexOf(this.dateOfItem);
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