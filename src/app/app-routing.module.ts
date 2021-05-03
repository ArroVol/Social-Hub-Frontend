import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TwitterComponent} from './twitter/twitter.component';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FacebookComponent} from './facebook/facebook.component';
import {SpotifyComponent} from './spotify/spotify.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AccountInformationComponent} from './account-information/account-information.component';
import {InstagramComponent} from './instagram/instagram.component';
import {SpotifyLandingComponent} from './spotify-landing/spotify-landing.component';
import {SpotifyPlaylistComponent} from './spotify-playlist/spotify-playlist.component';
import {TimelineComponent} from './timeline/timeline.component';
import {SpotifyCreatePlaylistComponent} from './spotify-create-playlist/spotify-create-playlist.component';
import {SpotifyArtistComponent} from "./spotify-artist/spotify-artist.component";
import {SpotifyUpdatePlaylistComponent} from "./spotify-update-playlist/spotify-update-playlist.component";
import {SpotifyFollowedTracksComponent} from "./spotify-followed-tracks/spotify-followed-tracks.component";
import {MainComponent} from './main/main.component';
import {YoutubeComponent} from './youtube/youtube.component';
import {CollectionComponent} from './collection/collection.component';
import {InstagramSearchComponent} from './instagram-search/instagram-search.component';
import {SpotifySearchComponent} from "./spotify-search/spotify-search.component";
import {OnePostComponent} from "./one-post/one-post.component";
import {ImagesComponent} from "./images/images.component";
import {SpotifyFavouritesComponent} from "./spotify-favourites/spotify-favourites.component";
import {OnePostArchiveComponent} from "./one-post-archive/one-post-archive.component";

const routes: Routes = [
  // { path: 'detail/:id', component: HeroDetailComponent },
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'twitter', component: TwitterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'facebook', component: FacebookComponent},
  {path: 'spotify', component: SpotifyComponent},
  {path: 'spotify/landing', component: SpotifyLandingComponent, pathMatch: 'full'},
  {path: 'spotify/playlist', component: SpotifyPlaylistComponent, pathMatch: 'prefix'},
  {path: 'spotify/artist', component: SpotifyArtistComponent, pathMatch: 'prefix'},
  {path: 'spotify/search', component: SpotifySearchComponent, pathMatch: 'full'},
  {path: 'spotify/favourite', component: SpotifyFavouritesComponent, pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'spotify/search', component: SpotifySearchComponent, pathMatch: 'full'},
  {path: 'login-page', component: LoginPageComponent},
  {path: 'account-information', component: AccountInformationComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: 'instagram', component: InstagramComponent},
  {path: 'instagram-search', component: InstagramSearchComponent},
  {path: 'youtube', component: YoutubeComponent},
  {path: 'collection', component: CollectionComponent},
  {path: 'one-post', component: OnePostComponent},
  {path: 'one-post-archive', component: OnePostArchiveComponent},
  {path: 'one-post-archive', component: OnePostArchiveComponent},

  {path: 'image', component: ImagesComponent}


  // {path: 'create-account', component: CreateAccountComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
