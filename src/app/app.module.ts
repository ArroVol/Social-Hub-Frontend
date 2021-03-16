import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MessagesComponent} from './messages/messages.component';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {TwitterComponent} from './twitter/twitter.component';
import {AppRoutingModule} from './app-routing.module';
import {ThrowAwayPageComponent} from './throw-away-page/throw-away-page.component';
import {RouterModule} from '@angular/router';
import {FacebookComponent} from './facebook/facebook.component';
import {SpotifyComponent} from './spotify/spotify.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SimpleFormComponent} from './simple-form/simple-form.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AccountInformationComponent} from './account-information/account-information.component';
import {SpotifyLandingComponent} from './spotify-landing/spotify-landing.component';
import {SpotifyPlaylistComponent} from './spotify-playlist/spotify-playlist.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TimelineComponent} from './timeline/timeline.component';
import {DataTablesModule} from 'angular-datatables';
import {SpotifyCreatePlaylistComponent} from './spotify-create-playlist/spotify-create-playlist.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {InstagramComponent} from './instagram/instagram.component';
import {MatCarousel, MatCarouselComponent} from '@ngbmodule/material-carousel';
import {DataTableComponent} from './data-table/data-table.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {SpotifyArtistComponent} from './spotify-artist/spotify-artist.component';
import {SpotifyUpdatePlaylistComponent} from './spotify-update-playlist/spotify-update-playlist.component';
import {CarouselModule, IconsModule, LogoComponent} from 'angular-bootstrap-md';
import {PreloadersModule} from 'ng-uikit-pro-standard';
import {AnimatedDigitComponent} from './animated-digit/animated-digit.component';
import {LoadingAnimationComponent} from './loading-animation/loading-animation.component';
import {NavbarModule, WavesModule, ButtonsModule} from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    TwitterComponent,
    ThrowAwayPageComponent,
    FacebookComponent,
    SpotifyComponent,
    DashboardComponent,
    SimpleFormComponent,
    LoginPageComponent,
    AccountInformationComponent,
    SpotifyLandingComponent,
    SpotifyPlaylistComponent,
    TimelineComponent,
    SpotifyCreatePlaylistComponent,
    InstagramComponent,
    InstagramComponent, DataTableComponent,
    MessagesComponent,
    SpotifyArtistComponent,
    SpotifyUpdatePlaylistComponent,
    AnimatedDigitComponent,
    LoadingAnimationComponent,
  ],
  imports: [
    HttpClientModule,
    MatSidenavModule,
    BrowserModule,
    DragDropModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    AppRoutingModule,
    MatMenuModule,
    RouterModule,
    DataTablesModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    CarouselModule,
    PreloadersModule,
    IconsModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

