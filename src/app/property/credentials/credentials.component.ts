import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";
import { NgForm, FormBuilder, Validators } from '@angular/forms';
/*Interfaces*/
import { Credential } from '../interfaces/credential';
/*Services*/
import { CredentialsService } from '../services/credentials.service';
import {AuthService} from '../../auth/auth.service';
import {DataStorageService} from "../../shared/services/data-storage.service";
import {HelperService} from "../../shared/services/helper.service";
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Hotel} from '../../hotels/interfaces/hotel';
import {VendorsService} from '../services/vendors.service';
import {Vendor} from '../interfaces/vendor';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  closeResult: string;

  credentials: any;
  hotel: Observable<Hotel>;

  name: string;
  link: string;
  username: string;
  password: string;
  hotelId: string;

  constructor(private router: Router,
              private modalService: NgbModal,
              private afs: AngularFirestore,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private credentialsService: CredentialsService,
              public dataProcessingService: DataProcessingService) { }

  ngOnInit() {
    this.credentials = this.credentialsService.getCredentials();
  }

  addNewCredentials (form: NgForm) {
    console.log(form.value);
    this.hotelId = localStorage.hotelId;
    form.value.htId = this.hotelId;
    console.log(form.value);
    this.credentialsService.addCredential(form.value);
    /*this.hotelId = this.afs.collection('vendors').doc(localStorage.hotelId).ref.id;*/
  }

  setCredentials() {
    let credential: Credential = {
      name: this.name,
      link: this.link,
      username: this.username,
      password: this.password,
      hotelId: localStorage.hotelId
    };
  }


  deleteCredential(credentialId) {
    this.afs.doc('credentials/'+credentialId).delete();
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
