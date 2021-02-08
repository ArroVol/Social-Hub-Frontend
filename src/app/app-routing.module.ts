import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TwitterComponent} from './twitter/twitter.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  // { path: 'detail/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'twitter', component: TwitterComponent },
  // { path: 'dashboard', component: DashboardComponent },
  // {path: 'create-account', component: CreateAccountComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
