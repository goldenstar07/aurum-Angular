import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
// Interfaces
import {Bill} from "../interfaces/bill";
// Service
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {UploadFileService} from "../../shared/services/upload-file.service";
import * as firebase from "firebase";
import {Hotel} from "../../hotels/interfaces/hotel";


@Injectable()
export class BillService {
  billsCol: AngularFirestoreCollection<Bill>;
  bills: any;
  downloadedItem: any;
  hotelsCol: any;

  constructor(private afs: AngularFirestore,
              private dataStorageService: DataStorageService,
              private db: AngularFireDatabase,
              private uploadFileService: UploadFileService,
              private DataProcessingService: DataProcessingService) {
  }

  getBills() {
    this.billsCol = this.afs.collection('bills');
    return this.billsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Bill;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }

  /*addBill(bill, hotelId) {
    /!*this.afs.collection('vendors').doc(hotelId).set(vendor);*!/
    /!*this.afs.collection('bills').add(bill);*!/
    this.afs.collection('bills').doc(hotelId).set(bill);
    console.log(this.afs.collection('bills').doc(hotelId).set(bill));

  }*/
  addBill(bill) {
    this.afs.collection('bills').add(bill);
  }

  deleteBillService(billId) {
    this.afs.doc('bills/' + billId).delete();
  }

  /*downloadItem() {
    // console.log(obj);
    // const storageRef = firebase.storage().refFromURL("gs://aurum-249ae.appspot.com/uploads/" + obj.htId);
    // console.log(storageRef)
    // console.log(this.afs.collection("hotels").filter(value => value.id === obj.htId));
    // console.log(this.afs.collection("hotels").get());
    // console.log(this.afs.collection("hotels").doc(obj.htId));
    this.hotelsCol = this.afs.collection('hotels');
    return this.hotelsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Hotel;
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    // firebase.storage().ref("uploads/").getDownloadURL().then(res => console.log(res));
  }*/
}

  /*malakama(bill){
    const blockHuy = document.getElementById("huy");
    const image = document.getElementById("imag");
    const dbRefObj = this.db.database.ref().child("uploads");
    const url = dbRefObj.child("url");
    dbRefObj.on('value', snap => {});

    dbRefObj.on('child_added', snap => {
      blockHuy.innerText = JSON.stringify(snap.val().url);
    console.log(blockHuy.innerText);
    image.setAttribute("src", blockHuy.innerText);
    });
  }
}*/

/*
var storage = firebase.storage();
var pathReference = storage.ref('images/stars.jpg');

// Create a reference from a Google Cloud Storage URI
var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg')

// Create a reference from an HTTPS URL
// Note that in the URL, characters are URL escaped!
var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');
*/
