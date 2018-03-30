import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase';
import {FirebaseObjectObservable} from "angularfire2/database-deprecated";

import {AuthService} from '../auth/auth.service';



interface Hotel {
  address: any;
  city: string;
  name: string;
}

interface HotelId extends Hotel {
  id: string;
}

interface FeaturedPhotosUrls {
  url1?: string;
  url2?: string;
}

@Component({
  selector: 'app-change-property',
  templateUrl: './change-property.component.html',
  styleUrls: ['./change-property.component.scss']
})
export class ChangePropertyComponent implements OnInit {
  closeResult: string;

  hotelsCol: AngularFirestoreCollection<Hotel>;
  /*hotels: Observable<Hotel[]>;*/
  hotels: any;

  name: string;
  address: any;
  city: string;

  hotelDoc: AngularFirestoreDocument<Hotel>;
  hotel: Observable<Hotel>;

  /*featuredPhotoStream: FirebaseObjectObservable<{FeaturedPhotosUrls}>;*/

  constructor(private router: Router,
              private modalService: NgbModal,
              private afs: AngularFirestore,
              private authService: AuthService,
              private db: AngularFireDatabase) {
   /* this.featuredPhotoStream = this.db.object('/photos/featured');*/
  }

  ngOnInit() {
    this.hotelsCol = this.afs.collection('hotels');
    /*this.hotels = this.hotelsCol.valueChanges();*/
    this.hotels = this.hotelsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a=> {
          const data = a.payload.doc.data() as Hotel;
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
  }

  openNewHotel(contentNewHotel) {
    this.modalService.open(contentNewHotel).result.then((result) => {
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

  addNewHotel() {
    this.afs.collection('hotels').add({'name': this.name, 'address': this.address, 'city': this.city});
  }
  getHotel(hotelId) {
    this.hotelDoc = this.afs.doc('hotels/' + hotelId);
    this.hotel = this.hotelDoc.valueChanges();
  }

  featuredPhotoSelected(event: any) {
    const file: File = event.target.files[0];
    console.log("Selected filename: ", file.name);

    const metaData = {'contentType': file.type};
    const storeageRef: firebase.storage.Reference = firebase.storage().ref('/photos/featured/url1');
    storeageRef.put(file, metaData);
    console.log("Uploading: ", file.name);
  }
}


