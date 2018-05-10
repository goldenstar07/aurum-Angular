import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DataProcessingService} from "../shared/services/data-processing.service";
import {DataStorageService} from "../shared/services/data-storage.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  closeResult: string;
  form: FormGroup;


  inventoryItems: any;
  inventoryLabels: Array<any>;
  inventoryDates: Array<any>;

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
              public datePipe: DatePipe,
  ) {

    this.dateIndex = 0;
    this.byDate = false;
    this.byType = false;
  }

  ngOnInit() {
  }


}
