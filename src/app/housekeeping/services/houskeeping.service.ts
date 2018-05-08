import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
import 'rxjs/add/operator/map';
/*Interfaces */
import { Housekeeping } from "../interfaces/houskeeping";
import { DataStorageService } from "../../shared/services/data-storage.service";
import {Hotel} from "../../hotels/interfaces/hotel";
import * as firebase from "firebase";
import {Manager} from "../../home/interfaces/manager";
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {AuthService} from "../../auth/auth.service";
import {FormBuilder} from "@angular/forms";
import {HotelService} from "../../hotels/services/hotel.service";

@Injectable()
export class HouskeepingService {

  housekeepingsCol: AngularFirestoreCollection<Housekeeping>;

  hotelId: string;

  constructor(private afs: AngularFirestore,
              private db: AngularFireDatabase,
              private dataStorageService: DataStorageService,
              public dataProcessingService: DataProcessingService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private hotelSevice: HotelService) {
  }

  getHousekeepings() {
    this.housekeepingsCol = this.afs.collection('housekeepings');
    return this.housekeepingsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Housekeeping;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }

  addHousekeeping(housekeeping, hotelId) {
    this.afs.collection('housekeepings').doc(hotelId).update({
      "housekeeping" : housekeeping
    });
  }
}



