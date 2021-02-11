import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MessagesComponent } from './messages/messages.component';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {MatSliderModule} from '@angular/material/slider';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';

// import{ AppRoutingModule } from './app-routing.module';


// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { SimpleFormComponent } from './simple-form/simple-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
// import { CreateAccountComponent } from './create-account/create-account.component';
// import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
// import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
// import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { SpotifyComponent } from './spotify/spotify.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    SpotifyComponent,
    AboutComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule
  ],
  providers: [],
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
