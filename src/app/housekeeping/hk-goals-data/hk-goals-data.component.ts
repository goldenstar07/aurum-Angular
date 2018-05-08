import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
import {FormArray, FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import * as firebase from "firebase/app";
import {DatePipe} from "@angular/common";
/*Interfaces */
import { Housekeeping } from "../interfaces/houskeeping";
// Services
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {HouskeepingService} from "../services/houskeeping.service";
import {HkManager} from "../../shared/classes/HkManager";

@Component({
  selector: 'app-hk-goals-data',
  templateUrl: './hk-goals-data.component.html',
  styleUrls: ['./hk-goals-data.component.scss']
})
export class HkGoalsDataComponent extends HkManager implements OnInit {
  /*closeResult: string;
  form: FormGroup;


  name: string;
  dnd: any;
  so: any;
  min: any;*/

  constructor(private router: Router,
              public modalService: NgbModal,
              public formBuilder: FormBuilder,
              private afs: AngularFirestore,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              private housekeepingService: HouskeepingService,
              public datePipe: DatePipe) {
    super(modalService, formBuilder, dataProcessingService, dataStorageService, datePipe);
  }

  ngOnInit() {
    this.housekeepingService.getHousekeepings().subscribe(res => {
      this.housekeepingItems = res[0].data;
      this.housekeepingLabels = [];
      this.getDates(this.housekeepingItems.housekeeping[Object.keys(this.housekeepingItems.housekeeping)[0]]);
      this.getLabels(this.housekeepingItems.housekeeping);
    });

    this.form = this.formBuilder.group({
      date: [''],
      housekeepings: this.formBuilder.array([this.createFormInput()])
    });
    console.log(this.form);
  }

  /*createFormInput(): FormGroup {
    return this.formBuilder.group({
      name: '',
      dnd: '',
      so: '',
      min: ''
    });

  }*/

  /* addFormInput() {
     const goal = this.createFormInput();
     this.goals.push(goal);
   }
   get goals(): FormArray {
     return this.form.get('goals') as FormArray;
   }

   saveFormInput() {
     console.log(this.form.value);
   }*/

  addItem(item, hotelId) {
    this.housekeepingService.addHousekeeping(item, hotelId);
  }

  saveFormInput() {

    this.form.value.housekeepings.forEach(item => {
      if (!this.housekeepingItems.housekeeping[item.item]) this.addNewItem(item.item);
    });


    let date = this.form.value.date ? this.datePipe.transform(this.form.value.date, 'yyyy-MM-dd') : this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let indexOfItem = this.checkIfDateExist(date);


    if (indexOfItem == -1) {
      this.addNewDate(date);
      indexOfItem = this.housekeepingDates.length - 1;
    }

    this.form.value.housekeepings.forEach(item => {
      this.housekeepingItems.housekeeping[item.item][indexOfItem].dnd = item.dnd;
      this.housekeepingItems.housekeeping[item.item][indexOfItem].so = item.so;
      this.housekeepingItems.housekeeping[item.item][indexOfItem].min = item.min;
    });

    this.housekeepingDates.sort((a, b) => +new Date(b) - +new Date(a));

    this.sortByDate();
    this.addItem(this.housekeepingItems.housekeeping, localStorage.hotelId);
  }

  addNewItem(name) {
    console.log(name);
    this.housekeepingItems.housekeeping[name] = [];
    this.housekeepingDates.forEach(date => {
      this.housekeepingItems.housekeeping[name].push({
        date: date,
        dnd: "",
        so: "",
        min: ""
      })
    })
  }

  addNewDate(date) {
    this.housekeepingDates.push(date);
    for (let key in this.housekeepingItems.housekeeping) {
      this.housekeepingItems.housekeeping[key].push({
        date: date,
        dnd: "",
        so: "",
        min: ""
      })
    }
  }

  updateHousekeepings() {
    this.addItem(this.housekeepingItems.housekeeping, localStorage.hotelId);
  }

  sortByDate() {
    for (let key in this.housekeepingItems.housekeeping) {
      this.housekeepingItems.housekeeping[key].sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }
    this.getDates(this.housekeepingItems.housekeeping[Object.keys(this.housekeepingItems.housekeeping)[0]]);
  }

  updateItemsByType() {
    this.currentItem = this.housekeepingItems.housekeeping[this.nameOfItem];
  }


  /*addNewGoal() {
    let goal: Goal = {
      name: this.name,
      dnd: this.dnd,
      so: this.so,
      min: this.min,
      hotelId: localStorage.hotelId
    };*/
  /*console.log(transaction);
  this.afs.collection('transactions').add(transaction);
  }*/

  /*popup*/
  /* openNewProperty(contentNewProperty) {
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
   }*/


}
