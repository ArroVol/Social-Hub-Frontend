import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MessagesComponent} from './messages/messages.component';
import {AppComponent} from './app.component';
// import {IconsModule, InputUtilitiesModule, MDBBootstrapModulesPro, MDBSpinningPreloader} from 'ng-uikit-pro-standard';
import {InputUtilitiesModule, MDBBootstrapModulesPro, MDBSpinningPreloader} from 'ng-uikit-pro-standard';
import * as moment from 'moment';
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
// import {ThrowAwayPageComponent} from './throw-away-page/throw-away-page.component';
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
// import {MatListModule} from '@angular/material/list';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TimelineComponent} from './timeline/timeline.component';
import {DataTablesModule} from 'angular-datatables';
import {YoutubeComponent} from './youtube/youtube.component';
import {SafePipe} from './youtube/SafePipe.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
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
import {SpotifyAddplaylistSnackbarComponent} from './spotify-addplaylist-snackbar/spotify-addplaylist-snackbar.component';
import {SpotifyAddplaylistWarningComponent} from './spotify-addplaylist-warning/spotify-addplaylist-warning.component';
import {SpotifyFollowedTracksComponent} from './spotify-followed-tracks/spotify-followed-tracks.component';
import {ModalModule} from 'angular-bootstrap-md';
import {SideNavComponent} from './side-nav/side-nav.component';
import {ModalComponent} from './modal/modal.component';
import {UpdateAccountComponent} from './update-account/update-account.component';
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {MatListModule} from '@angular/material/list';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './header/header.component';
import {LandingComponent} from './landing/landing.component';
import {FooterComponent} from './footer/footer.component';
import {MatStepperModule} from '@angular/material/stepper';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MatTreeModule} from '@angular/material/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Moment} from 'moment';
import {MomentModule} from 'ngx-moment';
// import { AboutComponent } from './about/about.component';
import {CollectionComponent} from './collection/collection.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import { OnePostComponent } from './one-post/one-post.component';
import {InstagramSearchComponent} from "./instagram-search/instagram-search.component";

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    MessagesComponent,
    TwitterComponent,
    // ThrowAwayPageComponent,
    FacebookComponent,
    SpotifyComponent,
    DashboardComponent,
    SimpleFormComponent,
    LoginPageComponent,
    AccountInformationComponent,
    SpotifyLandingComponent,
    SpotifyPlaylistComponent,
    TimelineComponent,
    LoginPageComponent,
    AccountInformationComponent,
    SpotifyCreatePlaylistComponent,
    InstagramComponent,
    InstagramComponent, DataTableComponent,
    MessagesComponent,
    SpotifyArtistComponent,
    SpotifyUpdatePlaylistComponent,
    AnimatedDigitComponent,
    LoadingAnimationComponent,
    SpotifyAddplaylistSnackbarComponent,
    SpotifyAddplaylistWarningComponent,
    SpotifyFollowedTracksComponent,
    ModalComponent,
    UpdateAccountComponent,
    ImageUploadComponent,
    MainComponent,
    HeaderComponent,
    LandingComponent,
    FooterComponent,
    SideNavComponent,
    YoutubeComponent,
    SafePipe,
    CollectionComponent,
    DashboardComponent,
    InstagramSearchComponent,
  ],
  imports: [
    HttpClientModule,
    MatSidenavModule,
    BrowserModule,
    DragDropModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    AppRoutingModule,
    ModalModule,
    BrowserAnimationsModule,
    MatDialogModule,
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
    MatCardModule,
    MatGridListModule,
    ScrollingModule,
    MatCardModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRippleModule,
    MatProgressBarModule,
    IconsModule,
    InputUtilitiesModule,
    MatListModule,
    NgxDropzoneModule,
    MatStepperModule,
    MatTreeModule,
    MatAutocompleteModule,
    MomentModule,
    MatButtonToggleModule,
    ScrollingModule
  ],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {displayDefaultIndicatorType: false}
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

