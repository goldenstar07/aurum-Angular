import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
// Interfaces
import { Payroll } from '../interface/payroll';
// Services
import {HelperService} from "../../shared/services/helper.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {Hotel} from '../../hotels/interfaces/hotel';


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

  addPayroll(payroll) {
      /*this.afs.collection('payrolls').doc(hotelId).set(payroll);*/
     /*this.afs.collection('payrolls').add(payroll);*/
      console.log(payroll);
    this.afs.collection('payrolls').add(payroll);
  }

}
