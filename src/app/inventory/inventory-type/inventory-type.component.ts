import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
import {FormArray, FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import * as firebase from "firebase/app";
// Interfaces
import {Inventory} from "../interface/inventory";
// Services
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-inventory-type',
  templateUrl: './inventory-type.component.html',
  styleUrls: ['./inventory-type.component.scss']
})
export class InventoryTypeComponent implements OnInit {
  form: FormGroup;

  inventoryItems: any;
  inventoryLabels: Array<any>;
  inventoryDates: any;
  hotelId: string;

  constructor(private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private afs: AngularFirestore,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              private datePipe: DatePipe) { }

  ngOnInit() {
  }

}
