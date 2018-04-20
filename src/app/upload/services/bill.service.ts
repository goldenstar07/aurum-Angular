import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
// Interfaces
import {Bill} from "../interfaces/bill";
// Service
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";


@Injectable()
export class BillService {
  billsCol: AngularFirestoreCollection<Bill>;
  bills: any;

  constructor(private afs: AngularFirestore,
              private dataStorageService: DataStorageService,
              private db: AngularFireDatabase) { }

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

  addBill(bill, hotelId) {
    /*this.afs.collection('vendors').doc(hotelId).set(vendor);*/
    /*this.afs.collection('bills').add(bill);*/
    this.afs.collection('bills').doc(hotelId).set(bill);
  }
  /*addVendor(vendor) {
    this.afs.collection('vendors').add(vendor);
   /!* this.afs.collection('inventories').doc().set(vendor);*!/
  }*/
}
