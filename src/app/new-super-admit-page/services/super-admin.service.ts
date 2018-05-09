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
import {AuthService} from "../../auth/auth.service";
import {Manager} from "../../home/interfaces/manager";

@Injectable()
export class SuperAdminService {
  adminsCol: AngularFirestoreCollection<Admin>;
  admins: any;

  password: string;
  admin: Array<Admin>;

  city: string;
  name: string;
  phone: any;
  email: string;
  number: any;
  status: any;
  hotelId: string;
  role: any;

  constructor(private afs: AngularFirestore,
              private db: AngularFireDatabase,
              private dataStorageService: DataStorageService,
              public dataProcessingService: DataProcessingService,
              private authService: AuthService) {}

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
    this.afs.collection('admins').add(admin);

    this.authService.signUpAdmin(admin, admin.password);
    /* let admin: Admin = {
       name: this.name,
       city: this.city,
       phone: this.phone,
       email: this.email,
       number: this.number,
       status: this.status,
       role: "admin",
       hotelId: localStorage.hotelId
     };
     this.authService.signUpAdmin(admin, this.password);*/
  }

  deleteAdminService(adminId) {
    this.afs.doc('admins/' +adminId).delete();
  }
}
