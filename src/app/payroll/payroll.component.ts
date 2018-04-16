import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
/*Interfaces */
import { Payroll } from "./interface/payroll";
// Services
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import {DataProcessingService} from '../shared/services/data-processing.service';
import {DataStorageService} from '../shared/services/data-storage.service';
import * as firebase from "firebase/app";
import {Inventory} from "../inventory/interface/inventory";


@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {
  closeResult: string;
  form: FormGroup;

  name: string;
  regular: any;
  over: any;

  constructor(private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private afs: AngularFirestore,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      date: [''],
      payrolls: this.formBuilder.array([this.createFormInput()])
    });
    console.log(this.form);
  }

  createFormInput(): FormGroup {
    return this.formBuilder.group({
      name: '',
      regular: '',
      over: ''
    });
  }

  addFormInput() {
    const payroll = this.createFormInput();
    this.payrolls.push(payroll);
  }
  get payrolls(): FormArray {
    return this.form.get('payrolls') as FormArray;
  }

  saveFormInput() {
    console.log(this.form.value);
  }

  addNewPayroll() {
    let payroll: Payroll = {
      name: this.name,
      regular: this.regular,
      over: this.over,
      hotelId: localStorage.hotelId
    };
    /*console.log(transaction);
    this.afs.collection('transactions').add(transaction);*/
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

}
