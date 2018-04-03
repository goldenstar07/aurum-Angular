import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';

import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {ChangePropertyComponent} from './change-property/change-property.component';
import {TransactionsComponent} from './transactions/transactions.component';


const appRoutes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component:  LoginComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'change_property', component: ChangePropertyComponent },
  { path: 'transactions', component: TransactionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
