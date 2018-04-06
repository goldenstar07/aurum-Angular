import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
import 'rxjs/add/operator/map';

@Injectable()
export class HouskeepingService {
  constructor(private afs: AngularFirestore,
              private db: AngularFireDatabase) {
  }
}



