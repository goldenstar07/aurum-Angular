import { Injectable } from '@angular/core';
import {Message} from '../models/Message';
import {User} from '../models/User';
import {DataStorageService} from '../../../shared/services/data-storage.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class ActivityChatService {

  messagesCol: AngularFirestoreCollection<Message>;
  messages: any;
  user: User; // User

  constructor(private afs: AngularFirestore,
              private dataStorageService: DataStorageService,
              private db: AngularFireDatabase) {}

  sendMessage(msg: Message): void {
    const timestamp = ActivityChatService.getTimeStamp();
    this.user = new User('');
    const userName = this.user.name;

    // timestamp is not verified for 3 hours

    msg.date = timestamp;
    msg.author = userName;

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
    this.messagesCol = this.afs.collection('messages', ref => ref.orderBy('date').limit(10));
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
