import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
// Interfaces
import {Hotel} from '../interfaces/hotel';
import {HelperService} from "../../shared/services/helper.service";
import {DataStorageService} from "../../shared/services/data-storage.service";

@Injectable()
export class HotelService {

  hotelsCol: AngularFirestoreCollection<Hotel>;
  hotels: any;

  constructor(private afs: AngularFirestore,
              private dataStorageService: DataStorageService,
              private db: AngularFireDatabase) {
  }

  getHotels() {
    this.hotelsCol = this.afs.collection('hotels');
    return this.hotelsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Hotel;
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
  }

  addHotel(hotel) {
    this.afs.collection('hotels').add(hotel);
  }
}
