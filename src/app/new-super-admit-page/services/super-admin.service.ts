import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
import 'rxjs/add/operator/map';
// Interfaces
import { Admin } from '../interfaces/admin';
// Services
import {HelperService} from "../../shared/services/helper.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {Hotel} from '../../hotels/interfaces/hotel';
import {Vendor} from '../../property/interfaces/vendor';

@Injectable()
export class SuperAdminService {
  adminsCol: AngularFirestoreCollection<Admin>;
  admins: any;

  constructor(private afs: AngularFirestore,
              private db: AngularFireDatabase,
              private dataStorageService: DataStorageService) {}

  getAdmins() {
    this.adminsCol = this.afs.collection('admins');
    return this.adminsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Vendor;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }

  addAdmin(admin) {
    /*this.afs.collection('admins').doc(hotelId).set(vendor);*/
    this.afs.collection('admins').add(admin);
  }
}
