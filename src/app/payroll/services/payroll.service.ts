import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
// Interfaces
import { Payroll } from '../interface/payroll';
// Services
import {HelperService} from "../../shared/services/helper.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {Hotel} from '../../hotels/interfaces/hotel';
import {Vendor} from '../../property/interfaces/vendor';

@Injectable()
export class PayrollService {
  payrollsCol: AngularFirestoreCollection<Payroll>;
  payrolls: any;

  constructor(private afs: AngularFirestore,
              private dataStorageService: DataStorageService,
              private db: AngularFireDatabase) {
  }

  getPayrolls() {
    this.payrollsCol = this.afs.collection('payrolls');
    return this.payrollsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Payroll;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }

  addPayroll(payroll, hotelId) {
    this.afs.collection('payrolls').doc(hotelId).set(payroll);
    /* this.afs.collection('payrolls').add(payroll);*/
  }
  /*addVendor(vendor) {
    this.afs.collection('vendors').add(vendor);
   /!* this.afs.collection('inventories').doc().set(vendor);*!/
  }*/
}
