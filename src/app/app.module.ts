import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {IconsModule, InputUtilitiesModule, MDBBootstrapModulesPro, MDBSpinningPreloader} from 'ng-uikit-pro-standard';
import * as moment from 'moment';
import { MessagesComponent } from './messages/messages.component';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';

// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { SimpleFormComponent } from './simple-form/simple-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
// import { CreateAccountComponent } from './create-account/create-account.component';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
// import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
// import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { TwitterComponent } from './twitter/twitter.component';
import { AppRoutingModule } from './app-routing.module';
// import { ThrowAwayPageComponent } from './throw-away-page/throw-away-page.component';
import {RouterModule} from '@angular/router';
import {SpotifyComponent} from './spotify/spotify.component';
import { SpotifyLandingComponent } from './spotify-landing/spotify-landing.component';
// import {MatMenuModule, MatDividerModule, MatCardModule, MatSlideToggleModule, MatOptionModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { DataTableComponent } from './data-table/data-table.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FacebookComponent } from './facebook/facebook.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AccountInformationComponent } from './account-information/account-information.component';
import { TimelineComponent } from './timeline/timeline.component';
import { YoutubeComponent } from './youtube/youtube.component';
import {SafePipe} from './youtube/SafePipe.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {ScrollingModule} from '@angular/cdk/scrolling';
//import { DataTableComponent } from './data-table/data-table.component';
import { InstagramComponent } from './instagram/instagram.component';
import { AnimatedDigitComponent } from './animated-digit/animated-digit.component';
import { LoadingAnimationComponent } from './loading-animation/loading-animation.component';
import {NavbarModule, WavesModule, ButtonsModule, CarouselModule} from 'angular-bootstrap-md';
import { InstagramSearchComponent } from './instagram-search/instagram-search.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRippleModule} from '@angular/material/core';
//****
import {MatProgressBarModule} from '@angular/material/progress-bar';
//****
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import {ModalModule} from 'angular-bootstrap-md';
import { ModalComponent } from './modal/modal.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import {MatListModule} from '@angular/material/list';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './header/header.component';
import {LandingComponent} from './landing/landing.component';
import {FooterComponent} from './footer/footer.component';
// import {NgxDropzoneModule} from 'ngx-dropzone';
import { SideNavComponent } from './side-nav/side-nav.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MomentModule} from 'ngx-moment';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MatTreeModule} from '@angular/material/tree';
import {Moment} from 'moment';
// import { AboutComponent } from './about/about.component';
import {CollectionComponent} from './collection/collection.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {PreloadersModule} from 'ng-uikit-pro-standard';
import { OnePostComponent } from './one-post/one-post.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";
import {GoalModalComponent} from "./goal-modal/goal-modal.component";

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
    SimpleFormComponent,
    LoginPageComponent,
    AccountInformationComponent,
    TimelineComponent,
    DataTableComponent,
    MessagesComponent,
    SpotifyComponent,
    ModalComponent,
    UpdateAccountComponent,
    ImageUploadComponent,
    MainComponent,
    HeaderComponent,
    LandingComponent,
    FooterComponent,
    SideNavComponent,
    // MarkAsteriskDirective,
    MainComponent,
    // AboutComponent,
    InstagramComponent,
    YoutubeComponent,
    SafePipe,
    CollectionComponent,
    DashboardComponent,
    LoadingAnimationComponent,
    InstagramSearchComponent,
    AnimatedDigitComponent,
    OnePostComponent,
    GoalModalComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    // AppRoutingModule,
    ModalModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSliderModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    // MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    AppRoutingModule,
    RouterModule,
    CarouselModule,
    MatSidenavModule,
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
    ScrollingModule,
    MatTabsModule
  ],
  providers: [ {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  }],
  exports: [
    AnimatedDigitComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// export class AppModule {
//   loggedIn: string;
//   constructor(private snackBar: MatSnackBar) {
//     this.loggedIn = sessionStorage.getItem('loggedIn');
//   }
//
//   openSnackBar(message: string, action: string) {
//     this.snackBar.open(message, action, {
//       duration: 2000,
//     });
//   }
// }
