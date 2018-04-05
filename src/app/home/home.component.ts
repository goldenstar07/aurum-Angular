import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
// services
import {AuthService} from '../auth/auth.service';
import {HotelService} from "../hotels/services/hotel.service";
// interfaces
import {Manager} from './interfaces/manager';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  closeResult: string;

  managersCol: any;
  /*managers: Observable<Manager[]>;*/
  managers: any;

  name: string;
  email: string;
  password: string;

  // managerDoc: AngularFirestoreDocument<Manager>;
  // manager: Observable<Manager>;

  constructor(private router: Router,
              private modalService: NgbModal,
              private afs: AngularFirestore,
              private authService: AuthService,
              private formBuilder:FormBuilder,
              private hotelSevice: HotelService
  ) {}

  ngOnInit() {

    // this.managersCol = this.afs.collection("managers").valueChanges().snapshotChanges()
    //   .map(actions => {
    //     return actions.map(a=> {
    //       const data = a.payload.doc.data() as Manager;
    //       const id = a.payload.doc.id;
    //       return { id, data };
    //     })
    //   });

    // docRef.get().then(function(doc) {
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }).catch(function(error) {
    //   console.log("Error getting document:", error);
    // });

    this.managersCol = this.afs.collection('managers').doc(this.hotelSevice.currentHotelId);
    setTimeout(function () {
        this.managersCol
        debugger
      },5000)
    // this.managers = this.managersCol.snapshotChanges()
    //   .map(actions => {
    //     return actions.map(a=> {
    //       const data = a.payload.doc.data() as Manager;
    //       const id = a.payload.doc.id;
    //       return { id, data };
    //     })
    //   });
    // setTimeout(function () {
    //   this.managers
    //   debugger
    // },5000)his.managersCol.subscribe(data => console.log(data) )
    /*FORM VALIDATION*/
    /*this.loginForm = this.formBuilder.group({
     password: [null, Validators.compose([Validators.required, Validators.minLength(6)])
     })*/
    /* this.loginForm = new FormGroup({
     password: new FormControl()
     });*/
  }

  addNewManager() {
    let manager = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: "manager",
      hotelId: this.hotelSevice.currentHotelId
    }
    this.authService.signupUser(manager);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openNewUser(contentNewUser) {
    this.modalService.open(contentNewUser).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDeleteComform(contentDeleteComform) {
    this.modalService.open(contentDeleteComform).result.then((result) => {
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

  deleteManager(managerId) {
    this.afs.doc('managers/'+managerId).delete();
  }

}

