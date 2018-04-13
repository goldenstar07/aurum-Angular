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
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule } from '@angular/material';
import 'hammerjs';


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
import { HotelsComponent } from './hotels/hotels.component';
import { HotelService } from './hotels/services/hotel.service';
import {HelperService} from "./shared/services/helper.service";
import {AutGuard} from "./shared/classes/auth.guard";
import {AdminGuard} from "./shared/classes/admin.guard";
import {DataProcessingService} from "./shared/services/data-processing.service";
import {HomeService} from './home/services/home.service';
import { TransactionsHeaderComponent } from './transactions/transactions-header/transactions-header.component';
import { TransactionsDateComponent } from './transactions/transactions-date/transactions-date.component';
import { TransactionsTypeComponent } from './transactions/transactions-type/transactions-type.component';
import {TransactionService} from './transactions/services/transaction.service';
import { HkGoalsDataComponent } from './housekeeping/hk-goals-data/hk-goals-data.component';
import { HkGoalsHkComponent } from './housekeeping/hk-goals-hk/hk-goals-hk.component';
import { HkHeaderComponent } from './housekeeping/hk-header/hk-header.component';
import { InventoryHeaderComponent } from './inventory/inventory-header/inventory-header.component';
import {ChangePropertyComponent} from './change-property/change-property.component';
import {ChatFormComponent} from "./activity/chat-form/chat-form.component";
import { FeedComponent } from './activity/feed/feed.component';
import { MessageComponent } from './activity/message/message.component';
import { UserListComponent } from './activity/user-list/user-list.component';
import { UserItemComponent } from './activity/user-item/user-item.component';
import {ChatService} from "./activity/chat.service";
import { ChatComponent } from './activity/chat/chat.component';
import { ActivityChatComponent } from './activity/activity-chat/activity-chat.component';

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
    HotelsComponent,
    TransactionsHeaderComponent,
    TransactionsDateComponent,
    TransactionsTypeComponent,
    HkGoalsDataComponent,
    HkGoalsHkComponent,
    HkHeaderComponent,
    InventoryHeaderComponent,
    ChangePropertyComponent,
    ChatFormComponent,
    FeedComponent,
    MessageComponent,
    UserListComponent,
    UserItemComponent,
    ChatComponent,
    ActivityChatComponent
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
    ReactiveFormsModule,
    /*MaterialModule.forRoot()*/
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [
    DataStorageService,
    DataProcessingService,
    AuthService,
    HelperService,
    UploadFileService,
    HotelService,
    AutGuard,
    AdminGuard,
    TransactionService,
    HomeService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
