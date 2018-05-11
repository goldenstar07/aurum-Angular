import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {DataStorageService} from "../shared/services/data-storage.service";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class AuthService {

  private authState: any;

  constructor(private router: Router,
              private afs: AngularFirestore,
              private dataStoreService: DataStorageService,
              private afAuth: AngularFireAuth) {
  }


  signUpUser(user, password) {
    firebase.auth().createUserWithEmailAndPassword(user.email, password)
      .then(response => {
        user.id = response.uid;
        this.afs.collection('managers').doc(response.uid).set(Object.assign({}, user))
      })
      .catch(
        error => console.log(error)
      );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.afs.doc('managers/' + response.uid).valueChanges().subscribe(res => {
            this.dataStoreService.setUser(res);
            let currentUser = this.dataStoreService.getUser();
            switch (currentUser.role) {
              case "manager":
                this.router.navigate(['transactions-date']);
                this.dataStoreService.setHotelId(currentUser.hotelId);
                break;
              case "admin":
                this.router.navigate(['hotels']);
                break;
              case "superadmin":
                this.router.navigate(['super-admin']);
                break;
              default:  this.router.navigate(['login']);
            }
          });
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/login']);
  }

}
