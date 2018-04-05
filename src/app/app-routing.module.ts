import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';

import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {HotelsComponent} from './hotels/hotels.component';
import {CanActivate} from "@angular/router";
import {AdminGuard} from "./shared/classes/admin.guard";
import {AutGuard} from "./shared/classes/auth.guard";

const appRoutes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component:  LoginComponent },
  { path: 'home', component:  HomeComponent , canActivate: [AutGuard, AdminGuard] },
  { path: 'transactions', component: TransactionsComponent , canActivate: [AutGuard] },
  { path: 'hotels', component:  HotelsComponent , canActivate: [AutGuard, AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
