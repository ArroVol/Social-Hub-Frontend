import { Component, OnInit } from '@angular/core';
// @ts-ignore
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// @ts-ignore
import {ErrorStateMatcher} from '@angular/material/core';
// @ts-ignore
import {MatSnackBar} from '@angular/material/snack-bar';
// @ts-ignore
import { ViewEncapsulation } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../model/user/User';
import {PreferencesService} from '../service/preferences.service';
import {Preferences} from '../model/user/Preferences';
import {TwitterData} from '../model/twitter/TwitterData';
import {TwitterService} from '../service/twitter.service';
import {AppComponent} from '../app.component';
import {Subject} from "rxjs";

// @ts-ignore
@Component({
  selector: 'app-simple-form',
  template: `

        <div *ngIf="!loggedIn else showLogOut" class="login-container" style="font-size: 10px; position: absolute; right: 40px; top: 12px">
      <input  #userName placeholder="Email" id="user-name" />
     <input type="password" #password placeholder="Password" id="password" />
<!--          <span *ngIf="!loggedIn"> <input type="password" #password placeholder="Password" id="password" />  </span>-->
          <!--          <div *ngIf="!loggedIn">-->
      <button mat-button *ngIf="!loggedIn else notShow" (click)="submit(userName.value, password.value);">Sign in</button>
<!--          </div>-->
          <ng-template #notShow>
            <button mat-button (click)="logOut();">
              Log Out
            </button>
          </ng-template>
          <ng-template #logOutDisplay>
            <button mat-button (click)="logOut();">
              Log Out
            </button>
          </ng-template>
    </div>
        <ng-template  #showLogOut>
          <div class="login-container" style="font-size: 10px; position: absolute; right: 40px; top: 12px">
            <button style="margin: 0" type="button" mat-button [matMenuTriggerFor]="menuUser">
                 <span class="material-icons">
                    settings
                </span>
            </button>

            <mat-menu #menuUser="matMenu">
              <button mat-menu-item><a routerLink="/login-page">log in page</a></button>
              <button mat-menu-item><a routerLink="/account-information">Account information</a></button>
              <button mat-menu-item><a routerLink="/about">about</a></button>
              <button class="log-out-btn" mat-button (click)="logOut();">
                Log Out
              </button>
            </mat-menu>

          </div>
        </ng-template>
<!--        <ng-template  #showLogOut>-->
<!--          <div class="login-container" style="font-size: 10px; position: absolute; right: 40px; top: 12px">-->

<!--          <button class="log-out-btn" mat-button (click)="logOut();">-->
<!--            Log Out-->
<!--          </button>-->
<!--          </div>-->
<!--        </ng-template>-->

    <p></p>
    <ng-template #loading>
      <div>
      </div>
    </ng-template>
  `,
  styles: ['./simple-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SimpleFormComponent implements OnInit {

  value: string;
  email: string;
  password: string;
  public studentId: string;
  loggedIn: boolean;
  logOutButton: string;
  user: User;
  preferences: Preferences;
  socialOnStart: string;
  twitterData: TwitterData;
  twitterHandleSave: string;
  // sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();
  // isSidebarVisible: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, public snackBar: MatSnackBar, private preferencesService: PreferencesService, private twitterService: TwitterService, private appComponent: AppComponent) {
    if (sessionStorage.getItem('username') !== null){
      this.loggedIn = true;

    }
    this.logOutButton = 'Sign in';
    // this.sidebarVisibilityChange.subscribe((value) => {
    //   this.isSidebarVisible = value
    // });
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  async openSnackBar(status: string) {
    if (status === 'success') {
      this.snackBar.open('Logged In Successfully', 'close', {
        duration: 3200,
      });
    } else {
      this.snackBar.open('Log in failed, try again', 'close', {
        duration: 3200,
      });
  }
    // this.delay(300);

  }



  ngOnInit(): void {
  }
  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  public async submit(email: string, password: string) {
    console.log('attempting login');
    this.email = email;
    this.password = password;
    this.userService.getUserByLogin(email, password)
      .subscribe(async user => {
        this.user = user;
        console.log(this.user.email);
        console.log('getting the users id as a string... ' + String(this.user.userId));
        sessionStorage.setItem('email', user.email);
        // sessionStorage.setItem('userId', user.userId.toString());
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('userId', String(this.user.userId));
        console.log('this is the users id: ' + user.userId);
        this.loggedIn = true;
        sessionStorage.setItem('loggedIn', String(this.loggedIn));
        console.log(sessionStorage.getItem('loggedIn'));
        this.openSnackBar('success');
        await this.delay(1000);
        // window.location.assign('/account-information');
        if (this.user == null ){
          console.log('log in failed');
          this.openSnackBar('fail');
        } else {
          console.log('getting preferences');
          // this.appComponent.displaySideNav = true;
          this.preferencesService.getPreferencesById(sessionStorage.getItem('userId'))
            .subscribe(preferences => {
              this.preferences = preferences;
              if (this.preferences === null){
                console.log('preferences are null.. load account page');
                this.socialOnStart = null;
                this.preferences = new Preferences();
                console.log('social on start is null...');
                window.location.assign('/account-information');
              } else {
                console.log('preferences arent null...');
                console.log(this.preferences.userId);
                console.log(this.preferences.onLogin);
                sessionStorage.setItem('socialOnStart', this.preferences.onLogin);
                // sessionStorage.setItem()
                this.socialOnStart = this.preferences.onLogin;
                console.log(this.socialOnStart);
                if (sessionStorage.getItem('socialOnStart') !== null){
                  console.log('social on start is not null');
                  let location = sessionStorage.getItem('socialOnStart').toLowerCase();
                  console.log(location);
                  let dash = '/';
                  let fullUrl = dash.concat(location);
                  console.log(fullUrl);
                  window.location.assign(fullUrl);
                  this.appComponent.checkLogin();
                  // this.appComponent.login(true);
                  // this.appComponent.displaySideNav = true;


                }
              }
            });
          this.getTwitterData();
          // this.isSidebarVisible = true;
        }
      });
  //   if (!this.loggedIn){
  //   this.openSnackBar('fail');
  //
  // }
  }

  logOut() {
    this.loggedIn = false;
    sessionStorage.clear();
    window.location.assign('/main');
    this.appComponent.displaySideNav = false;


  }

  checkLogIn() {
    console.log('checking...');
    console.log(sessionStorage.getItem('studentId'));
    if (sessionStorage.getItem('studentId') !== null){
      this.loggedIn = true;
    }
  }

   getTwitterData() {
     console.log('in get twitter data...');
     this.twitterService.getTwitterData(sessionStorage.getItem('userId'))
       .subscribe(twitterDataReturned => {
         if (twitterDataReturned === null) {
           console.log('return null twitter data');
         }
         this.twitterData = twitterDataReturned;
         this.twitterHandleSave = this.twitterData.twitterHandle;
         console.log('the users handle..');
         console.log(this.twitterHandleSave);
         console.log(this.twitterData.twitterHandle);
         sessionStorage.setItem('twitterHandle', this.twitterData.twitterHandle);
         sessionStorage.setItem('twitterHandleFound', 'true');
       });
   }

   getUser(): User {
    return this.user;
   }

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
