import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ViewEncapsulation } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../model/user/User';
import {PreferencesService} from '../service/preferences.service';
import {Preferences} from '../model/user/Preferences';

@Component({
  selector: 'app-simple-form',
  template: `

        <div class="login-container" style="font-size: 10px; position: absolute; right: 40px; top: 12px">
      <input #userName placeholder="Email" id="user-name" />
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
    </div>
<!--    <div *ngIf="user else loading">-->
<!--    </div>-->

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

  constructor(private userService: UserService, public snackBar: MatSnackBar, private preferencesService: PreferencesService) {
    if (sessionStorage.getItem('username') !== null){
      this.loggedIn = true;
    }
    this.logOutButton = 'Sign in';
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
        sessionStorage.setItem('email', user.email);
        sessionStorage.setItem('userId', user.userId.toString());
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
          this.preferencesService.getPreferencesById(sessionStorage.getItem('userId'))
            .subscribe(preferences => {
              this.preferences = preferences;
              if (this.preferences === null){
                console.log('preferences are null');
                this.socialOnStart = null;
                this.preferences = new Preferences();
              } else {
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
                } else {
                  console.log('social on start is null...');
                  window.location.assign('/account-information');

                }
              }
            });
        }
      });

  if (!this.loggedIn){
    this.openSnackBar('fail');

  }
  }

  logOut() {
    this.loggedIn = false;
    sessionStorage.clear();
    window.location.assign('/login-page');

  }

  checkLogIn() {
    console.log('checking...');
    console.log(sessionStorage.getItem('studentId'));
    if (sessionStorage.getItem('studentId') !== null){
      this.loggedIn = true;
    }
  }

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
