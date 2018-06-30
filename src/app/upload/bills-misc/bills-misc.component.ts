import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import {Http} from "@angular/http";
// Interfaces
import { Bill } from "../interfaces/bill";
import {Hotel} from "../../hotels/interfaces/hotel";
// Services
import {DataStorageService} from "../../shared/services/data-storage.service";
import {HelperService} from "../../shared/services/helper.service";
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {HotelService} from "../../hotels/services/hotel.service";
import {AuthService} from "../../auth/auth.service";
import {BillService} from "../services/bill.service";
import {UploadFileService} from '../../shared/services/upload-file.service';
// Classes
import {FileUpload} from '../../shared/classes/file-upload';
import * as firebase from "firebase";


@Component({
  selector: 'app-bills-misc',
  templateUrl: './bills-misc.component.html',
  styleUrls: ['./bills-misc.component.scss']
})
export class BillsMiscComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = {percentage: 0};



  @ViewChild('downloadZipLink') private downloadZipLink: ElementRef;

  closeResult: string;
  view: any;

  bills: any;
  bill: Observable<Bill>;
  hotel: Observable<Hotel>;
  deletedBill: any;
  downloadedBill: any;

  date: any;
  name: any;
  image: any;
  hotelId: any;
  fileName: any;
  url: any;
  title: any;

  constructor(private router: Router,
              private modalService: NgbModal,
              private afs: AngularFirestore,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private hotelService: HotelService,
              public dataProcessingService: DataProcessingService,
              private billService: BillService,
              private uploadService: UploadFileService,
              private dataStorageService: DataStorageService,
              private http: Http) { }

  ngOnInit() {
    this.billService.getBills().subscribe(res => {
      this.bills = this.dataProcessingService.createArrayOfItemsbyHotelId2(res);
    });
  }

  addNewBill(form: NgForm) {  /*Save*/

    console.log(form.value);
    this.hotelId = localStorage.hotelId;
    form.value.htId = this.hotelId;
    form.value.image = this.currentFileUpload.url;
    console.log(form.value);
    this.billService.addBill(form.value);

  }


  setBills() {
    // let bill: Bill = {
    //   name: this.name,
    //   date: this.date,
    //   image: this.currentFileUpload.url,
    //   hotelId: localStorage.hotelId
    // };
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    // if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    // } else {
    //   alert('invalid format!');
    // }
    this.upload();
    /*return this.fileName = file;*/
    console.log(file.name);

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
      return `with: ${reason}`;
    }
  }

  // popup view img
  openViewImg(contentViewImg) {

debugger
    this.modalService.open(contentViewImg).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteBill(billId) {
    this.deletedBill = this.billService.deleteBillService(billId);
  }

  downloadImage(downloadLink) {
    let url = decodeURIComponent(downloadLink.data.image);
    let arr = url.split('/');
    let name = arr[arr.length - 1].substr(0, arr[arr.length - 1].indexOf('?alt'));
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`/uploads/${name}`) .getDownloadURL().then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        /* Create a new Blob object using the response
        *  data of the onload object.
        */
        const blob = new Blob([xhr.response], { type: 'image/jpg' });
        const a: any = document.createElement('a');
        a.style = 'display: none';
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
      };
      xhr.open('GET', url);
      xhr.send();
    }).catch(function(error) {
      // Handle any errors
      console.log(error);
    });
  }

  //   this.billService.downloadImage(downloadLink).subscribe(res => {
  //   })
  // }

  // downloadZip(): Promise<void> {
  //   const blob = await this.billService.downloadResource(this.bills);
  //   const url = window.URL.createObjectURL(blob);
  //
  //   const link = this.downloadZipLink.nativeElement;
  //   link.href = url;
  //   link.download = 'archive.zip';
  //   link.click();
  //
  //   window.URL.revokeObjectURL(url);
  //
  // }
}
