import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';

import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {MainHomePageComponent} from './home/main-home-page/main-home-page.component';
import {ChangePropertyComponent} from './change-property/change-property.component';


const appRoutes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component:  LoginComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'home/add_user', component: MainHomePageComponent },
  { path: 'change_property', component: ChangePropertyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
