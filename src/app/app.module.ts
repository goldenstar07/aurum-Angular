import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';



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
import { ChangePropertyComponent } from './change-property/change-property.component';
import {AuthService} from './auth/auth.service';
import {AppRoutingModule} from './app-routing.module';
import {DataStorageService} from './shared/data-storage.service';


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
    ChangePropertyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ DataStorageService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
