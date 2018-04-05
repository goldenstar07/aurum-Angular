import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
// Services
import {TransactionService} from '../services/transaction.service';

@Component({
  selector: 'app-transactions-date',
  templateUrl: './transactions-date.component.html',
  styleUrls: ['./transactions-date.component.scss']
})
export class TransactionsDateComponent implements OnInit {
  closeResult: string;

  transactions: any;

  type: string;
  value: any;
  date: any;

  constructor(private router: Router,
              private modalService: NgbModal,
              private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactions = this.transactionService.getTransactions();
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

  addNewProperty() {
    this.transactionService.addTransaction({
      'type': this.type,
      'value': this.value,
      'date': this.date
    });
  }


}
