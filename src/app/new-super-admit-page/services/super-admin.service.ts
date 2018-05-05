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
import {DataProcessingService} from "../../shared/services/data-processing.service";

@Injectable()
export class SuperAdminService {
  adminsCol: AngularFirestoreCollection<Admin>;
  admins: any;

  constructor(private afs: AngularFirestore,
              private db: AngularFireDatabase,
              private dataStorageService: DataStorageService,
              public dataProcessingService: DataProcessingService) {}

  getAdmins() {
    this.adminsCol = this.afs.collection('admins');
    return this.adminsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Admin;
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
  }

  addAdmin(admin) {
    /*this.afs.collection('admins').doc(hotelId).set(vendor);*/
    this.afs.collection('admins').add(admin);
  }

  deleteAdminService(adminId) {
    this.afs.doc('admin/' + adminId).delete();
  }
}
