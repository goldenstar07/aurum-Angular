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
  

  addPayroll(item, hotelId) {
      console.log(item);
    this.afs.collection('payrolls').add(item);
    // this.afs.collection('inventories').doc(hotelId).update({
    //   "payroll" : item
    // });
  }
addNewField() {
    this.afs.collection('payrolls').doc(localStorage.hotelId).set({
      "payroll" : {}
    });
  }
}
//  {date: "",
//        payrolls:
//        [{date: "2018-06-01", name: "Vitaliy Ploshchinskiy", regular: 3, over: 12}],
//         htId: "PHIFzkoZSXttVM6ENSsu"} );
//     console.log(form.value, this.hotelId);
//   }
