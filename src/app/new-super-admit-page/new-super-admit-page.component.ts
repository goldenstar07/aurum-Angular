import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";
import { NgForm, Validators, FormArray, FormBuilder, FormGroup ,FormControl } from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
// Interfaces
import { Admin } from './interfaces/admin';
import {Hotel} from '../hotels/interfaces/hotel';
// Services
import { SuperAdminService } from './services/super-admin.service';
import {DataProcessingService} from '../shared/services/data-processing.service';
import {DataStorageService} from '../shared/services/data-storage.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-new-super-admit-page',
  templateUrl: './new-super-admit-page.component.html',
  styleUrls: ['./new-super-admit-page.component.scss']
})
export class NewSuperAdmitPageComponent implements OnInit {
  closeResult: string;

  newPass: string;

  adminsCol: AngularFirestoreCollection<Admin>;
  admins: any;
  admin: Observable<Admin>;
  hotel: Observable<Hotel>;
  deletedAdmin: any;
  adminn: Array<Admin>;

  // city: string;
  // name: string;
  // phone: any;
  // email: string;
  // number: any;
  // status: any;
  // hotelId: string;
  // role: any;
  form: FormGroup;
  city: FormControl;
  name: FormControl;
  phone: FormControl;
  email: FormControl;
  number: FormControl;
  status: FormControl;
  hotelId: FormControl;
  role: FormControl;
  password: FormControl;

  constructor(private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private afs: AngularFirestore,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              private superAdminService: SuperAdminService,
              private authService: AuthService) {

    this.createAdminAddingForm()

  }

  ngOnInit() {
    this.superAdminService.getAdmins().subscribe(res => {
      this.admins  = this.dataProcessingService.createArrayOfAdmins(res);
      console.log(this.admins);
    });
  }
  createAdminAddingForm(){
    this.city = new FormControl('', Validators.required);
    this.name = new FormControl('', Validators.required);
    this.phone = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.number = new FormControl('',[ Validators.required, Validators.min(1)]),
    this.status = new FormControl('', [Validators.required, Validators.pattern('(inactive|active)')]),
    this.password = new FormControl('', Validators.required);
    
    this.form = new FormGroup({
      name: this.name,
      city: this.city,
      phone: this.phone,
      email: this.email,
      number: this.number,
      status: this.status,
      password: this.password
    });
  }
  addNewSuperAdmin(form: NgForm) {
    // let password = form.value.password;
    // let admin = form.value;
    // admin.role = "admin";
    // delete admin.password;
    // this.authService.signUpUser(admin, password);
    let admin = {
      name: this.name.value,
      city: this.city.value,
      phone: this.phone.value,
      email: this.email.value,
      number: this.number.value,
      status: this.status.value,
      role:'admin'    
    }
    let _password = this.password.value
    this.authService.signUpUser(admin, _password);
    console.log(this.city.value)
  }

  saveFormInput() {
    console.log('haha');
    return true;
  }

  deleteSuperAdmin(adminId) {
    this.deletedAdmin = this.superAdminService.deleteAdminService(adminId);
  }

  changePassword(email) {
    this.superAdminService.changePassword(email);
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
  onLogout() {
    this.authService.logout();
    this.dataStorageService.removeDataFromLocalStorage();
  }
}
