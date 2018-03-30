import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {NgForm} from '@angular/forms';

import {AuthService} from '../auth/auth.service';

interface Manager {
  email: string;
  name: string;
  /*password: string;*/
}

interface ManagerId extends Manager {
  id: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  closeResult: string;

  managersCol: AngularFirestoreCollection<Manager>;
  /*managers: Observable<Manager[]>;*/
  managers: any;

  name: string;
  email: string;
  /*password: string;*/

  managerDoc: AngularFirestoreDocument<Manager>;
  manager: Observable<Manager>;

  constructor(private router: Router,
              private modalService: NgbModal,
              private afs: AngularFirestore,
              private authService: AuthService) { }


  ngOnInit() {
    this.managersCol = this.afs.collection('managers');
    /*this.managers = this.managersCol.valueChanges();*/
    this.managers = this.managersCol.snapshotChanges()
      .map(actions => {
        return actions.map(a=> {
          const data = a.payload.doc.data() as Manager;
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
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

  addNewUser() {
    /*this.afs.collection('managers').add({'name': this.name, 'email': this.email, 'role': this.role});*/
    /*this.afs.collection('managers').add({'name': this.name, 'email': this.email, 'password': this.password});*/
    this.afs.collection('managers').add({'name': this.name, 'email': this.email, 'role': 'manager'});
  }
  getManager(managerId) {
    this.managerDoc = this.afs.doc('managers/' + managerId);
    this.manager = this.managerDoc.valueChanges();
  }
  deleteManager(managerId) {
    this.afs.doc('managers/'+managerId).delete();
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
  }
}

