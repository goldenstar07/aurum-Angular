import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";
import { NgForm, Validators, FormArray, FormBuilder, FormGroup ,FormControl } from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import * as firebase from 'firebase';
// Interfaces
import { Admin } from './interfaces/admin';
import {Hotel} from '../hotels/interfaces/hotel';
// Services
import { SuperAdminService } from './services/super-admin.service';
import {DataProcessingService} from '../shared/services/data-processing.service';
import {DataStorageService} from '../shared/services/data-storage.service';
import {AuthService} from '../auth/auth.service';
import { HotelService } from '../hotels/services/hotel.service';

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
  addAdminModalRef: any;
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
  addAdminErrorMessage: string;
  addAdminHasError:boolean;

  checkPassword: FormControl;
  checkPasswordForm: FormGroup;
  checkPasswordModalRef: any;
  deleteAdminName: string;
  deleteAdminId: string;
  deleteAdminError: string;
  constructor(private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private afs: AngularFirestore,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              private superAdminService: SuperAdminService,
              private authService: AuthService) {

    this.createAdminAddingForm()
    this.createDeleteConfirmForm()            
  }

  ngOnInit() {
    this.superAdminService.getAdmins().subscribe(res => {
      this.admins  = this.dataProcessingService.createArrayOfAdmins(res);
      console.log(this.admins);
    });
  }
  createDeleteConfirmForm(){
    this.checkPassword = new FormControl('', [Validators.required, Validators.min(6)]);
    this.checkPasswordForm = new FormGroup({
      checkPassword:this.checkPassword
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
  addNewUserSuccess = response => {
    console.log("successfully added");
    this.addAdminModalRef.close()
    
  }

  addNewUserFail =error => {
    console.log(error)
    this.addAdminErrorMessage =error.message;
    this.addAdminHasError = true;
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
    this.authService.signUpNewUser(admin, _password, this.addNewUserSuccess, this.addNewUserFail);
    console.log(this.city.value)
  }

  cancelDeleteAdmin(){
    this.createDeleteConfirmForm()
    this.checkPasswordModalRef.close();

  }

  deleteSuperAdmin(adminId, adminName, checkPasswordDelete) {
    this.deleteAdminName = adminName;
    this.deleteAdminId = adminId;
    this.deleteAdminError = '';
    this.checkPasswordModalRef = this.modalService.open(checkPasswordDelete);

    this.checkPasswordModalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // this.deletedAdmin = this.superAdminService.deleteAdminService(adminId);
  }

  deleteAdminUser(){   
  console.log(this.deleteAdminId);
   firebase.auth().currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, this.checkPassword.value))
   .then(
      response => {
        this.afs.collection('hotels').ref.where("adminId",'==', this.deleteAdminId).get()
        .then(
          hotels => {
              hotels.docs.forEach((hotel)=>{
                console.log(hotel.data);
                this.afs.collection('manaagers').ref.where('hotelId', '==', hotel.id).get()
                .then(
                  managers => {
                    managers.docs.forEach(manager =>{
                      manager.ref.delete();
                    })
                  }
                )

            
            })
          }
        )    
   
         this.superAdminService.deleteAdminService(this.deleteAdminId)
         this.checkPasswordModalRef.close();
    
   })
   .catch(
     error => this.deleteAdminError = error.message
   );

  }
  
  changePassword(email) {
    this.superAdminService.changePassword(email);
  }

  /*Popup*/
  openNewProperty(contentNewProperty) {
    this.createAdminAddingForm()
    this.addAdminModalRef = this.modalService.open(contentNewProperty);
    

    this.addAdminModalRef.result.then((result) => {
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
