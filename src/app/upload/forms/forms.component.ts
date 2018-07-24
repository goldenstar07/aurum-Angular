import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';
// Interfaces
import { Form } from '../interfaces/form';
import {Hotel} from "../../hotels/interfaces/hotel";
// Services
import {DataStorageService} from "../../shared/services/data-storage.service";
import {HelperService} from "../../shared/services/helper.service";
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {HotelService} from "../../hotels/services/hotel.service";
import {AuthService} from "../../auth/auth.service";
import {UploadFileService} from '../../shared/services/upload-file.service';
import { FormService } from '../services/form.service';
// Classes
import {FileUpload} from '../../shared/classes/file-upload';
import {Http} from "@angular/http";


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = {percentage: 0};

  closeResult: string;

  forms: any;
  form: Observable<Form>;
  hotel: Observable<Hotel>;
  deletedForm: any;

  date: any;
  name: any;
  image: any;
  hotelId: any;
  url: any;
  formForm: FormGroup;
  addFormModalRef: any;
  currentUser:any;
  constructor(private router: Router,
              private modalService: NgbModal,
              private afs: AngularFirestore,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private hotelService: HotelService,
              public dataProcessingService: DataProcessingService,
              private formService: FormService,
              private uploadService: UploadFileService,
              private dataStorageService: DataStorageService,
              private http: Http) { }

  ngOnInit() {
    this.currentUser = this.dataStorageService.getUser();
    console.log(this.currentUser)
    this.formService.getForms().subscribe(res => {
      this.forms = this.dataProcessingService.createArrayOfItemsbyHotelId2(res);
    });
    
  }
 
 
  createFormForm(){
   
    this.formForm = new FormGroup({
      date: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)

    })
  }
  
  openViewImg(contentViewImg) {
    
    this.addFormModalRef =  this.modalService.open(contentViewImg);
    this.addFormModalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  addNewForm() {  /*Save*/
    /*console.log(form.value);
    this.hotelId = this.afs.collection('forms').doc(localStorage.hotelId).ref.id;
    this.formService.addForm(form.value, this.hotelId);*/
    /*this.hotelId = this.afs.collection('vendors').doc(localStorage.hotelId).ref.id;*/
    // console.log(form.value);
    this.hotelId = localStorage.hotelId;
    this.formForm.value.htId = this.hotelId;
    this.formForm.value.image = this.currentFileUpload.url;         
    this.formService.addForm(this.formForm.value);
    this.addFormModalRef.close()
  }

  setForms() {
    let form: Form = {
      name: this.name,
      date: this.date,
      image: this.currentFileUpload.url,
      hotelId: localStorage.hotelId
    };
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  isPdf(fileName){
    return fileName.split('?').slice(-2)[0].split('.').slice(-1)[0].toLowerCase()=='pdf';
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')|| file.type.match('pdf.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
    this.upload();
    /*return this.fileName = file;*/
    console.log(file.name);

  }

  deleteForm(formId) {
    this.deletedForm = this.formService.deleteFormService(formId);
  }

  // popup
  openNewProperty(contentNewProperty) {
    this.createFormForm()
    this.addFormModalRef = this.modalService.open(contentNewProperty);
    this.addFormModalRef.result.then((result) => {
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
