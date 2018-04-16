import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
/*Interfaces */
import {Goal} from "../interface/housekeeping";
// Services
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import * as firebase from "firebase/app";
import {HouskeepingService} from "../services/houskeeping.service";
import {Transaction} from "../../transactions/interfaces/transaction";

@Component({
  selector: 'app-hk-goals-data',
  templateUrl: './hk-goals-data.component.html',
  styleUrls: ['./hk-goals-data.component.scss']
})
export class HkGoalsDataComponent implements OnInit {
  closeResult: string;
  form: FormGroup;


  name: string;
  dnd: any;
  so: any;
  min: any;

  constructor(private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private afs: AngularFirestore,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              private housekeepingService: HouskeepingService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      date: [''],
      goals: this.formBuilder.array([this.createFormInput()])
    });
    console.log(this.form);
  }

  createFormInput(): FormGroup {
    return this.formBuilder.group({
      name: '',
      dnd: '',
      so: '',
      min: ''
    });

  }

  addFormInput() {
    const goal = this.createFormInput();
    this.goals.push(goal);
  }
  get goals(): FormArray {
    return this.form.get('goals') as FormArray;
  }

  saveFormInput() {
    console.log(this.form.value);
  }

  addNewGoal() {
    let goal: Goal = {
      name: this.name,
      dnd: this.dnd,
      so: this.so,
      min: this.min,
      hotelId: localStorage.hotelId
    };
    /*console.log(transaction);
    this.afs.collection('transactions').add(transaction);*/
  }

/*popup*/
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


}
