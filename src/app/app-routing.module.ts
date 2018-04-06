import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';

import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {ChangePropertyComponent} from './change-property/change-property.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {TransactionsDateComponent} from "./transactions/transactions-date/transactions-date.component";
import {TransactionsTypeComponent} from "./transactions/transactions-type/transactions-type.component";
import {HkGoalsDataComponent} from "./housekeeping/hk-goals-data/hk-goals-data.component";
import {HkGoalsHkComponent} from "./housekeeping/hk-goals-hk/hk-goals-hk.component";
import {RoomComponent} from "./inventory/room/room.component";
import {MaintenanceComponent} from "./inventory/maintenance/maintenance.component";
import {FbComponent} from "./inventory/fb/fb.component";
import {FdMiscComponent} from "./inventory/fd-misc/fd-misc.component";


const appRoutes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component:  LoginComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'change_property', component: ChangePropertyComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'transactions-date', component: TransactionsDateComponent },
  { path: 'transactions-type', component: TransactionsTypeComponent },
  { path: 'houskeeping-date', component: HkGoalsDataComponent },
  { path: 'houskeeping-hk', component: HkGoalsHkComponent },
  { path: 'room', component: RoomComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'fb', component: FbComponent },
  { path: 'fd-misc', component: FdMiscComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
