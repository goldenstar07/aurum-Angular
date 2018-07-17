import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    // firebase.initializeApp({
    //   apiKey: "AIzaSyAoaxNAMyoOh5JHUAVfzx8ua4m_fau7GVk",
    //   authDomain: "aurum-249ae.firebaseapp.com",
    //   databaseURL: "https://aurum-249ae.firebaseio.com",
    //   projectId: "aurum-249ae",
    //   storageBucket: "aurum-249ae.appspot.com",
    //   messagingSenderId: "1041935493149",
    // });
    firebase.initializeApp({
      apiKey: "AIzaSyCwQzXTZz4ByxLsrju5qQv5zgL3dVA5tc0",
      authDomain: "aurumbackend.firebaseapp.com",
      databaseURL: "https://aurumbackend.firebaseio.com",
      projectId: "aurumbackend",
      storageBucket: "aurumbackend.appspot.com",
      messagingSenderId: "832150769171"
    });
  }
}

/*
service firebase.storage {
  match /b/{bucket}/o {
  match /{allPaths=**} {
    allow read, write: if request.auth != null;
  }
}
}*/
