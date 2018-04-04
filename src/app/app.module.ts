import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from "angularfire2";
import firestore = firebase.firestore;
import * as firebase from "firebase/app";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireDatabaseModule} from "angularfire2/database";

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HousekeepingComponent } from './housekeeping/housekeeping.component';
import { RoomComponent } from './inventory/room/room.component';
import { MaintenanceComponent } from './inventory/maintenance/maintenance.component';
import { FbComponent } from './inventory/fb/fb.component';
import { FdMiscComponent } from './inventory/fd-misc/fd-misc.component';
import { ActivityComponent } from './activity/activity.component';
import { PayrollComponent } from './payroll/payroll.component';
import { VendorsComponent } from './property/vendors/vendors.component';
import { CredentialsComponent } from './property/credentials/credentials.component';
import { EmployeeComponent } from './property/employee/employee.component';
import { BillsMiscComponent } from './upload/bills-misc/bills-misc.component';
import { FormsComponent } from './upload/forms/forms.component';
import {AuthService} from './auth/auth.service';
import {AppRoutingModule} from './app-routing.module';
import {DataStorageService} from './shared/services/data-storage.service';
import {UploadFileService} from './shared/services/upload-file.service';
import {HomeService} from "./home/home.service";
import { HotelsComponent } from './hotels/hotels.component';
import { HotelService } from './hotels/services/hotel.service';

  var firebaseConfig = {
    apiKey: "AIzaSyAoaxNAMyoOh5JHUAVfzx8ua4m_fau7GVk",
    authDomain: "aurum-249ae.firebaseapp.com",
    databaseURL: "https://aurum-249ae.firebaseio.com",
    projectId: "aurum-249ae",
    storageBucket: "aurum-249ae.appspot.com",
    messagingSenderId: "1041935493149"
  };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    TransactionsComponent,
    HousekeepingComponent,
    RoomComponent,
    MaintenanceComponent,
    FbComponent,
    FdMiscComponent,
    ActivityComponent,
    PayrollComponent,
    VendorsComponent,
    CredentialsComponent,
    EmployeeComponent,
    BillsMiscComponent,
    FormsComponent,
    HotelsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule
  ],
  providers: [
    DataStorageService,
    AuthService,
    HomeService,
    UploadFileService,
    HotelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
