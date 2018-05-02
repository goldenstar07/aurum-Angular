import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
import 'rxjs/add/operator/map';
/*Interfaces */
import { Goal } from "../interface/housekeeping";

@Injectable()
export class HouskeepingService {
  constructor(private afs: AngularFirestore,
              private db: AngularFireDatabase) {
  }
}



