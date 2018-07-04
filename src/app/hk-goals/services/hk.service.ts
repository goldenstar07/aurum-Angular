import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
// Interfaces
import { HK } from '../interface/hk';
// Services
import {HelperService} from "../../shared/services/helper.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {Hotel} from '../../hotels/interfaces/hotel';


@Injectable()
export class HKService {
  hksCol: AngularFirestoreCollection<HK>;
  hks: any;

  constructor(private afs: AngularFirestore,
              private dataStorageService: DataStorageService,
              private db: AngularFireDatabase) {
  }

  getHK() {
    this.hksCol = this.afs.collection('hks');
    return this.hksCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as HK;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }
  

  addHK(item, hotelId) {
      console.log(item);
    this.afs.collection('hks').add(item);
    // this.afs.collection('inventories').doc(hotelId).update({
    //   "hk" : item
    // });
  }
addNewField() {
    this.afs.collection('hks').doc(localStorage.hotelId).set({
      "hk" : {}
    });
  }
}
//  {date: "",
//        hks:
//        [{date: "2018-06-01", name: "Vitaliy Ploshchinskiy", regular: 3, over: 12}],
//         htId: "PHIFzkoZSXttVM6ENSsu"} );
//     console.log(form.value, this.hotelId);
//   }




// To be removed in prod


// import {Injectable} from "@angular/core";
// import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
// import {AngularFireDatabase} from "angularfire2/database";
// import 'rxjs/add/operator/map';
// /*Interfaces */
// import { Housekeeping } from "../interfaces/houskeeping";
// import { DataStorageService } from "../../shared/services/data-storage.service";
// import {Hotel} from "../../hotels/interfaces/hotel";
// import * as firebase from "firebase";
// import {Manager} from "../../home/interfaces/manager";
// import {DataProcessingService} from "../../shared/services/data-processing.service";
// import {AuthService} from "../../auth/auth.service";
// import {FormBuilder} from "@angular/forms";
// import {HotelService} from "../../hotels/services/hotel.service";

// @Injectable()
// export class HKService {

//   housekeepingsCol: AngularFirestoreCollection<Housekeeping>;

//   hotelId: string;

//   constructor(private afs: AngularFirestore,
//               private db: AngularFireDatabase,
//               private dataStorageService: DataStorageService,
//               public dataProcessingService: DataProcessingService,
//               private authService: AuthService,
//               private formBuilder: FormBuilder,
//               private hotelSevice: HotelService) {
//   }

//   getHousekeepings() {
//     this.housekeepingsCol = this.afs.collection('housekeepings');
//     return this.housekeepingsCol.snapshotChanges()
//       .map(actions => {
//         return actions.map(a => {
//           const data = a.payload.doc.data() as Housekeeping;
//           const id = a.payload.doc.id;
//           return {id, data};
//         });
//       });
//   }

//   addHousekeeping(housekeeping, hotelId) {
//     this.afs.collection('housekeepings').doc(hotelId).update({
//       "housekeeping" : housekeeping
//     });
//   }
// }



