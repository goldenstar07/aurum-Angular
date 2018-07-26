import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
import 'rxjs/add/operator/map';
// Interfaces
import {Transaction} from '../interfaces/transaction';

@Injectable()
export class TransactionService {

  transactionsCol: AngularFirestoreCollection<Transaction>;


  constructor(private afs: AngularFirestore,
              private db: AngularFireDatabase) {}

  getTransactions() {
    this.transactionsCol = this.afs.collection('transactions');
    return this.transactionsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }

  addTransaction(item, hotelId) {
    
    this.afs.collection('transactions').doc(hotelId).set(item);
  }

  // addNewField(){
  //   this.afs.collection('inventories').doc(localStorage.hotelId).set({
  //     "room" : {} ,
  //     "maintenance" : {},
  //     "fb" : {},
  //     "misc" : {},
  //   });
  // }

}
