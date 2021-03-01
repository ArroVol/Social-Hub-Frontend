import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ViewEncapsulation } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../model/user/User';

@Component({
  selector: 'app-simple-form',
  template: `

        <div class="login-container" style="font-size: 10px; position: absolute; right: 40px; top: 12px">
      <input #userName placeholder="Email" id="user-name" />
      <input type="password" #password placeholder="Password" id="password"  />
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

  constructor(private userService: UserService, public snackBar: MatSnackBar) {
    if (sessionStorage.getItem('email') !== null){
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
    this.delay(300);

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngOnInit(): void {
  }

  public async submit(email: string, password: string) {
    this.email = email;
    this.password = password;
    this.userService.getUserByLogin(email, password)
      .subscribe(user => {
        this.user = user;
        sessionStorage.setItem('email', user.email);
        // sessionStorage.setItem('studentFirstName', user.firstName);
        this.loggedIn = true;
        sessionStorage.setItem('loggedIn', String(this.loggedIn));
        // window.location.reload();
        this.openSnackBar('success');
        // window.location.reload();
        // this.openSnackBar('success');
      });
    if (this.user == null && !this.loggedIn){
      this.openSnackBar('fail');
    }
  }

  logOut() {
    this.loggedIn = false;
    // this.user = null;
    sessionStorage.clear();
    window.location.reload();
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
