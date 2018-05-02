// import { Injectable } from '@angular/core';
// import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
// import { AngularFireAuth } from "angularfire2/auth";
// import { Observable } from "rxjs/Observable";
// import * as firebase from 'firebase/app';
//
// import { ChatMessage }  from '../activity/models/chat-message.model';
// import {AuthService} from "../auth/auth.service";
//
// @Injectable()
// export class ChatService {
//   user: any;
//   /*chatMessages: FirebaseListObservable<ChatMessage[]>;*/
//   chatMessages: AngularFireList<ChatMessage[]>;
//   chatMessage: ChatMessage;
//   userName: Observable<string>;
//
//   constructor(private db: AngularFireDatabase,
//               private afAuth: AngularFireAuth) {
//       /*this.afAuth.authState.subscribe(auth => {
//         if (auth !== undefined && auth !==null) {
//           this.user = auth;
//         }
//       })*/
//   }
//
//   /*sendMessage(msg: string){
//     const timestamp = this.getTimeStamp();
//     /!*const email = this.user.email;*!/
//     const email = 'test@example.com';
//     this.chatMessages = this.getMessages();
//     this.chatMessages.push({
//       message: msg,
//       timeSent: timestamp,
//       /!*userName: this.userName,*!/
//       userName: 'test-user',
//       email: email
//     });
//     console.log('Called sendMessage()!');
//   }
// */
//   /*getMessages(): FirebaseListObservable<ChatMessage[]> {*/
//
// /*  getMessages(): AngularFireList<ChatMessage[]> {
//     //query to create message feed binding
//     return this.db.list('messages', {
//       query: {
//         limitToLast: 25,
//         orderByKey: true
//       }
//     });
//   }*/
//   /*getMessages(): Observable<ChatMessage[]> {
//     return this.db.list('/messages', ref => {
//       ref.limitTolast(25).orderByKey(true)
//     });
//   }*/
//   /*getMessages(): Observable<ChatMessage[]> {
//     return this.db.list('/messages', ref => {
//       let q = ref.limitTolast(25).orderByKey(true);
//       return q;
//     });
//   }*/
//
//
//
// }
