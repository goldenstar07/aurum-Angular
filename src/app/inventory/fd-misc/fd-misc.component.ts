import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
/*Interfaces */
import { Inventory } from "../interface/inventory";
// Services
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import * as firebase from "firebase/app";

@Component({
  selector: 'app-fd-misc',
  templateUrl: './fd-misc.component.html',
  styleUrls: ['./fd-misc.component.scss']
})
export class FdMiscComponent implements OnInit {
  closeResult: string;
  form: FormGroup;

  item: string;
  have: any;
  need: any;

  constructor(private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private afs: AngularFirestore,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      date: [''],
      fds: this.formBuilder.array([this.createFormInput()])
    });
    console.log(this.form);
  }

  createFormInput(): FormGroup {
    return this.formBuilder.group({
      item: '',
      have: '',
      need: ''
    });
  }

  addFormInput() {
    const fd = this.createFormInput();
    this.fds.push(fd);
  }
  get fds(): FormArray {
    return this.form.get('fds') as FormArray;
  }

  saveFormInput() {
    console.log(this.form.value);
  }

  addNewFd() {
    let fd: Inventory = {
      item: this.item,
      have: this.have,
      need: this.need,
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
