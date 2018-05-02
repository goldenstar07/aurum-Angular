import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
// Interfaces
import { Vendor } from '../interfaces/vendor';
// Services
import {HelperService} from "../../shared/services/helper.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {Hotel} from '../../hotels/interfaces/hotel';

@Injectable()
export class VendorsService {
  vendorsCol: AngularFirestoreCollection<Vendor>;
  vendors: any;

  constructor(private afs: AngularFirestore,
              private dataStorageService: DataStorageService,
              private db: AngularFireDatabase) {
  }

  getVendors() {
    this.vendorsCol = this.afs.collection('vendors');
    return this.vendorsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Vendor;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }

  addVendor(vendor) {
    /*this.afs.collection('vendors').doc(hotelId).set(vendor);*/
    this.afs.collection('vendors').add(vendor);
  }
  /*addVendor(vendor) {
    this.afs.collection('vendors').add(vendor);
   /!* this.afs.collection('inventories').doc().set(vendor);*!/
  }*/
}
