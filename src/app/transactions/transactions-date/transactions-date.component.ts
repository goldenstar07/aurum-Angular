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
/*import Transaction = firebase.firestore.Transaction;*/


@Component({
  selector: 'app-transactions-date',
  templateUrl: './transactions-date.component.html',
  styleUrls: ['./transactions-date.component.scss']
})
export class TransactionsDateComponent implements OnInit {
  closeResult: string;
  form: FormGroup;


 /* transactionsCol: any;
  transactions: Array<Transaction>;
*/
  type: string;
  price: any;

  constructor(private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private afs: AngularFirestore,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              private transactionService: TransactionService) { }

  ngOnInit() {
    /*this.transactions = this.transactionService.getTransactions();
  }*/
    this.form = this.formBuilder.group({
      date: [''],
      /*inputPrice: [''],*/
      transactions: this.formBuilder.array([this.createFormInput()])
    });
    console.log(this.form);

  }

  createFormInput(): FormGroup {
    return this.formBuilder.group({
      type: '',
      price: ''
    });

  }


  addFormInput() {
    const transaction = this.createFormInput();
    this.transactions.push(transaction);
  }
  get transactions(): FormArray {
    return this.form.get('transactions') as FormArray;
  }

  saveFormInput() {
    console.log(this.form.value);
  }

  addNewTransaction() {
    let transaction: Transaction = {
      type: this.type,
      price: this.price,
      hotelId: localStorage.hotelId
    };
    /*console.log(transaction);
    this.afs.collection('transactions').add(transaction);*/
  }

  /*getTransaction() {
    this.transactionsCol = this.afs.collection('transactions');
    this.transactionsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a=> {
          const data = a.payload.doc.data() as Transaction;
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
      .subscribe(res => {
        this.transactions = this.dataProcessingService.createArrayOfItemsbyHotelId(res);
      })
  }*/


  /*Popup*/
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

  // addNewProperty() {
  //   this.transactionService.addTransaction({
  //     'type': this.type,
  //     'value': this.value,
  //     'date': this.date
  //   });
  // }


}
