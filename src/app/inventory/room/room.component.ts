import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
import {FormArray, FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import * as firebase from "firebase/app";
// Interfaces
import { Inventory } from "../interface/inventory";
// Services
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import { RoomService } from "../services/room.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  closeResult: string;
  form: FormGroup;

  rooomsCol: any;
  roooms: any;
  hotelId: string;

  item: string;
  have: any;
  need: any;
  date: any;

  constructor(private router: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private afs: AngularFirestore,
              public dataProcessingService: DataProcessingService,
              public dataStorageService: DataStorageService,
              private roomService: RoomService) { }


  ngOnInit() {
    this.roooms = this.roomService.getRooms();
    this.form = this.formBuilder.group({
      date: [''],
      rooms: this.formBuilder.array([this.createFormInput()])
    });
    console.log(this.form);

   /* this.roomsCol = this.afs.collection('inventories');
    this.roomsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a=> {
          const data = a.payload.doc.data() as Inventory;
          const id = a.payload.doc.id;
          return { id, data };
        })
      })*/
      /*.subscribe(res => {
        this.rooms = this.dataProcessingService.createArrayOfItemsbyHotelId(res);
      })*/

    /*firebase.auth().createUserWithEmailAndPassword(user.email, password)
      .then(response => {
        this.afs.collection('managers').doc(response.uid).set(Object.assign({}, user))
      })
      .catch(
        error => console.log(error)
      );*/
  }

  createFormInput(): FormGroup {
    return this.formBuilder.group({
      item: '',
      have: '',
      need: ''
    });
  }

  addFormInput() {
    const room = this.createFormInput();
    this.rooms.push(room);
  }
  get rooms(): FormArray {
    return this.form.get('rooms') as FormArray;
  }

  saveFormInput() {
    console.log(this.form.value);
  }

  addNewRoom(form: NgForm) {
    this.hotelId = this.afs.collection('inventories').doc(localStorage.hotelId).ref.id;
    this.roomService.addRoom(form.value, this.hotelId);
    /*let room: Inventory = {
      item: this.item,
      have: this.have,
      need: this.need,
      hotelId: localStorage.hotelId
    };*/
    /*this.afs.collection('inventories').add(room);*/
    /*this.afs.collection('inventories' +hotelId).add(room);*/
  }


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
