import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";
import { NgForm, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

// Interfaces
import { Admin } from './interfaces/admin';

// Services
import { SuperAdminService } from './services/super-admin.service';
import {DataProcessingService} from '../shared/services/data-processing.service';
import {DataStorageService} from '../shared/services/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Hotel} from '../hotels/interfaces/hotel';
import {Vendor} from '../property/interfaces/vendor';

@Component({
  selector: 'app-new-super-admit-page',
  templateUrl: './new-super-admit-page.component.html',
  styleUrls: ['./new-super-admit-page.component.scss']
})
export class NewSuperAdmitPageComponent implements OnInit {
  closeResult: string;
  form: FormGroup;

  admins: any;
  admin: Observable<Admin>;
  hotel: Observable<Hotel>;

  city: string;
  name: string;
  phone: any;
  email: string;
  number: any;
  status: any;
  hotelId: string;

  constructor(private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private afs: AngularFirestore,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              private superAdminService: SuperAdminService) {
  }

  ngOnInit() {
    /*this.admins = this.superAdminService.getAdmins();
    console.log(this.admins);*/
    this.superAdminService.getAdmins().subscribe(res => {
      this.admins  = res;
      console.log(this.admins);
    });
  }

  addNewSuperAdmin(form: NgForm) {
    console.log(form.value);
    this.hotelId = localStorage.hotelId;
    form.value.htId = this.hotelId;
    console.log(form.value);
    this.superAdminService.addAdmin(form.value);
  }

  setAdmins() {
    let admin: Admin = {
      name: this.name,
      city: this.city,
      phone: this.phone,
      email: this.email,
      number: this.number,
      status: this.status,
      hotelId: localStorage.hotelId
    };
  }

    deleteSuperAdmin(adminId) {
    console.log(adminId);
      this.afs.doc('admins/' +adminId).delete();
    }

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
        return `with: ${reason}`;
      }
    }
  }
