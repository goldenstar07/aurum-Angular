import { Injectable } from '@angular/core';
import {Message} from '../models/Message';
import {User} from '../models/User';
import {DataStorageService} from '../../../shared/services/data-storage.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ActivityChatService {

  messagesCol: AngularFirestoreCollection<Message>;
  messages: any;
  user: any; // User
  users: AngularFirestoreDocument<User>;
  userName: Observable<string>;

  constructor(private afs: AngularFirestore,
              private dataStorageService: DataStorageService,
              private db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      // this.getUser().subscribe(a => {
      //   this.userName = a.displayName;
      //   console.log(this.users);
      // })
    });
  }

  getUserId() {
    return this.user.uid;
  }

  getUser(){
    const userId = this.user.uid;
    const path = `/messages/${userId}`;
    return this.afs.doc(path);
  }

  sendMessage(msg: Message): void {
    const timestamp = ActivityChatService.getTimeStamp();
    // this.user = new User('');
    // const userName = this.user.name;


    msg.date = timestamp;
    /*msg.author = userName;*/

    this.afs.collection('messages').add(msg);
  }

  static getTimeStamp() {
   const now = new Date();

    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();
    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();
    return (date + ' ' + time);
  }

  getMessages() {
    this.messagesCol = this.afs.collection('messages', ref => ref.orderBy('date', "desc"));
    return this.messagesCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Message;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }

}
