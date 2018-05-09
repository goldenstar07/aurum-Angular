import {Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
// services
import {AuthService} from '../auth/auth.service';
import {HotelService} from "../hotels/services/hotel.service";
import {DataStorageService} from "../shared/services/data-storage.service";
import {HelperService} from "../shared/services/helper.service";
// models
import {Manager} from './interfaces/manager';
import {DataProcessingService} from "../shared/services/data-processing.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  closeResult: string;

  managersCol: any;
  managers: Array<Manager>;

  name: string;
  email: string;
  password: string;

  constructor(private router: Router,
              private modalService: NgbModal,
              private afs: AngularFirestore,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private hotelSevice: HotelService,
              public dataProcessingService: DataProcessingService
  ) {}

  ngOnInit() {
    this.managersCol = this.afs.collection('managers');
    this.managersCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Manager;
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
      .subscribe(res => {
        this.managers = this.dataProcessingService.createArrayOfItemsbyHotelId(res);
      });
  }

  addNewManager() {
    let manager: Manager = {
      name: this.name,
      email: this.email,
      role: "manager",
      hotelId: localStorage.hotelId
    }
    this.authService.signUpUser(manager, this.password);
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

