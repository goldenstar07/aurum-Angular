import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
// Interfaces
import { Bill } from "../interfaces/bill";
// Services
import {DataStorageService} from "../../shared/services/data-storage.service";
import {HelperService} from "../../shared/services/helper.service";
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {HotelService} from "../../hotels/services/hotel.service";
import {AuthService} from "../../auth/auth.service";
import {Hotel} from "../../hotels/interfaces/hotel";
import {BillService} from "../services/bill.service";
import {UploadFileService} from '../../shared/services/upload-file.service';
// Classes
import {FileUpload} from '../../shared/classes/file-upload';


@Component({
  selector: 'app-bills-misc',
  templateUrl: './bills-misc.component.html',
  styleUrls: ['./bills-misc.component.scss']
})
export class BillsMiscComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = {percentage: 0};

  closeResult: string;

  bills: any;
  bill: Observable<Bill>;
  hotel: Observable<Hotel>;

  date: any;
  name: any;
  image: any;
  hotelId: any;

  constructor(private router: Router,
              private modalService: NgbModal,
              private afs: AngularFirestore,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private hotelService: HotelService,
              public dataProcessingService: DataProcessingService,
              private billService: BillService,
              private uploadService: UploadFileService) { }

  ngOnInit() {
    this.bills = this.billService.getBills();
  }

  addNewBill(form: NgForm) {  /*Save*/
    console.log(form.value);
    this.hotelId = this.afs.collection('bills').doc(localStorage.hotelId).ref.id;
    this.billService.addBill(form.value, this.hotelId);
    /*this.hotelId = this.afs.collection('vendors').doc(localStorage.hotelId).ref.id;*/
  }

  setBills() {
    let bill: Bill = {
      name: this.name,
      date: this.date,
      image: this.image,
      hotelId: localStorage.hotelId
    };
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
    this.upload();
  }

  // popup
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
