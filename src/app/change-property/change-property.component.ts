import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from 'angularfire2/database';
import { UploadFileService } from '../shared/services/upload-file.service';

import {AuthService} from '../auth/auth.service';

class FileUpload {

  key: string;
  name: string;
  url: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}

interface Hotel {
  address: any;
  city: string;
  name: string;
  url: string;
  image?: string;
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

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };

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
              private db: AngularFireDatabase,
              private uploadService: UploadFileService

  ) {}

  ngOnInit() {
    this.hotelsCol = this.afs.collection('hotels');
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
    console.log("Hello")
    // this.afs.collection('hotels').add({
    //   'name': this.name,
    //   'address': this.address,
    //   'city': this.city,
    //   'image': this.currentFileUpload.url
    // });
  }
  getHotel(hotelId) {
    this.hotelDoc = this.afs.doc('hotels/' + hotelId);
    this.hotel = this.hotelDoc.valueChanges();
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
    this.upload();
  }
}


