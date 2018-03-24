import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAoaxNAMyoOh5JHUAVfzx8ua4m_fau7GVk",
      authDomain: "aurum-249ae.firebaseapp.com",
      databaseURL: "https://aurum-249ae.firebaseio.com",
      projectId: "aurum-249ae",
      storageBucket: "aurum-249ae.appspot.com",
      messagingSenderId: "1041935493149"
    });
  }
}
