import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
// services
import { AuthService } from '../../auth/auth.service';
// interfaces
import { DataStorageService } from '../../shared/services/data-storage.service';
import {DataProcessingService} from '../../shared/services/data-processing.service';
import { Housekeeping } from '../interfaces/houskeeping';

@Component({
  selector: 'app-hk-goals-date',
  templateUrl: './hk-goals-date.component.html',
  styleUrls: ['./hk-goals-date.component.scss']
})
export class HkGoalsDateComponent implements OnInit {
  closeResult: string;
  form: FormGroup;

  name: any;
  value1: any;
  value2: any;
  value3: any;

  constructor(private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private afs: AngularFirestore,
              private authService: AuthService,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      inputName: [''],
      inputValue1: [''],
      inputValue2: [''],
      inputValue3: [''],
      housekeepings: this.formBuilder.array([this.createFormInput()])
    });
    console.log(this.form);

  }

  createFormInput(): FormGroup {
    return this.formBuilder.group({
      name: '',
      value1: '',
      value2: '',
      value3: ''
    });
  }

  addFormInput() {
    const housekeeping = this.createFormInput();
    this.housekeepings.push(housekeeping);
  }
  get housekeepings(): FormArray {
    return this.form.get('housekeepings') as FormArray;
  }

  saveFormInput() {
    console.log(this.form.value);
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
