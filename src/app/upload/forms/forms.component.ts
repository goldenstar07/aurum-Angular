import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
// Interfaces
import { Form } from '../interfaces/form';
// Services
import {DataStorageService} from "../../shared/services/data-storage.service";
import {HelperService} from "../../shared/services/helper.service";
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {HotelService} from "../../hotels/services/hotel.service";
import {AuthService} from "../../auth/auth.service";
import {Hotel} from "../../hotels/interfaces/hotel";
import {UploadFileService} from '../../shared/services/upload-file.service';
import { FormService } from '../services/form.service';
// Classes
import {FileUpload} from '../../shared/classes/file-upload';
import {Bill} from '../interfaces/bill';
import {BillService} from '../services/bill.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  closeResult: string;

  forms: any;
  form: Observable<Form>;
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
              private formService: FormService,
              private uploadService: UploadFileService) { }

  ngOnInit() {
    this.forms = this.formService.getForms();
  }

  addNewForm(form: NgForm) {  /*Save*/
    console.log(form.value);
    this.hotelId = this.afs.collection('forms').doc(localStorage.hotelId).ref.id;
    this.formService.addForm(form.value, this.hotelId);
    /*this.hotelId = this.afs.collection('vendors').doc(localStorage.hotelId).ref.id;*/
  }

  setForms() {
    let form: Form = {
      name: this.name,
      date: this.date,
      image: this.image,
      hotelId: localStorage.hotelId
    };
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
