import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TwitterComponent} from './twitter/twitter.component';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FacebookComponent} from './facebook/facebook.component';
import {SpotifyComponent} from './spotify/spotify.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AccountInformationComponent} from './account-information/account-information.component';
import {SpotifyLandingComponent} from './spotify-landing/spotify-landing.component';
import {TimelineComponent} from './timeline/timeline.component';
import {MainComponent} from './main/main.component';
import {YoutubeComponent} from './youtube/youtube.component';
import {InstagramComponent} from './instagram/instagram.component';
import {CollectionComponent} from './collection/collection.component';
import {InstagramSearchComponent} from './instagram-search/instagram-search.component';
import {OnePostComponent} from "./one-post/one-post.component";

const routes: Routes = [
  // { path: 'detail/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'twitter', component: TwitterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'facebook', component: FacebookComponent },
  { path: 'spotify', component: SpotifyComponent },
  { path: 'spotify/landing', component: SpotifyLandingComponent, pathMatch: 'full' },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'account-information', component: AccountInformationComponent },
  { path: 'main', component: MainComponent },
  { path: 'instagram', component: InstagramComponent },
  { path: 'instagram-search', component: InstagramSearchComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'youtube', component: YoutubeComponent },
  { path: 'account-information', component: AccountInformationComponent},
  { path: 'instagram', component: InstagramComponent},
  { path: 'collection', component: CollectionComponent},
  { path: 'one-post', component: OnePostComponent}





  // {path: 'create-account', component: CreateAccountComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
