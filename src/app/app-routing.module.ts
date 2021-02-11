import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TwitterComponent} from './twitter/twitter.component';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FacebookComponent} from './facebook/facebook.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AccountInformationComponent} from './account-information/account-information.component';

const routes: Routes = [
  // { path: 'detail/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'twitter', component: TwitterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'facebook', component: FacebookComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'account-information', component: AccountInformationComponent },




  // {path: 'create-account', component: CreateAccountComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
