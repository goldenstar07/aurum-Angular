import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
// Interfaces
import { Form } from '../interfaces/form';
// Service
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {Bill} from '../interfaces/bill';

@Injectable()
export class FormService {
  formsCol: AngularFirestoreCollection<Form>;
  forms: any;

  constructor(private afs: AngularFirestore,
              private dataStorageService: DataStorageService,
              private db: AngularFireDatabase) {
  }

  getForms() {
    this.formsCol = this.afs.collection('forms');
    return this.formsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Form;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }

  addForm(form, hotelId) {
    /*this.afs.collection('vendors').doc(hotelId).set(vendor);*/
    /*this.afs.collection('bills').add(bill);*/
    this.afs.collection('forms').doc(hotelId).set(form);
  }

}
