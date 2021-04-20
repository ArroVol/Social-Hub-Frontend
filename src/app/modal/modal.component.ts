import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from '../model/user/User';
import {UserService} from '../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatHorizontalStepper, MatStepper} from '@angular/material/stepper';
import {TwitterData} from '../model/twitter/TwitterData';
import {TwitterUserData} from '../account-information/account-information.component';
import {TwitterService} from '../service/twitter.service';
import {SpotifyService} from '../service/spotify.service';

// @ts-ignore
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
//user-data.ts
// @ts-ignore
export class UserData {
  constructor(
    // public primaryAddress: string,
    public email: string,
    public name: string,
    public password: string,
    s: string){}
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  showMore: boolean;
  twitterEditable: boolean;
  validTwitterHandle: boolean;
  twitterData: TwitterData;
  twitterModel = new TwitterUserData('', '');
  twitterHandleFound: boolean;
  signUpSuccessful = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  usernameTaken: boolean;
  emailTaken: boolean;
  parameterTaken: string;
  myForm: FormGroup;
  loggedIn: string;
  accountCreated: boolean;
  validatingForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  userModel = new UserData('', '', '', '');
  newUser: User;
  userEmails = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
  });
  validUserFields: boolean;
  nextForm: boolean;
  authorizationLink: string;
  logged = false;



  // tslint:disable-next-line:variable-name
  constructor(public dialogRef: MatDialogRef<ModalComponent>, private formBuilder: FormBuilder,
              // tslint:disable-next-line:variable-name
              private userService: UserService, public snackBar: MatSnackBar, private _formBuilder: FormBuilder,
              private twitterService: TwitterService, private spotifyService: SpotifyService) {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, {validator: this.checkPasswords});
  }

  ngOnInit() {
    this.nextForm = false;
    this.validUserFields = false;
    this.usernameTaken = true;
    this.emailTaken = true;
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  actionFunction() {
    alert('You have logged out.');
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }
  omit_special_char(event)
  {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  save(f: User, isValid: boolean) {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  next(username: string, password: string, email: string) {
    console.log('in the signup class');
    this.newUser = new User();
    this.newUser.email = email;
    this.newUser.password = password;
    this.newUser.username = username;
    // check(if username is taken)
    // check(if email is taken)
    this.userService.checkUsernameExists(username)
      .subscribe(usernameTaken => {
        this.usernameTaken = usernameTaken;
        console.log('the boolean for username: ,' + usernameTaken);
        this.userService.checkEmailExists(email)
          .subscribe(emailTaken => {
            this.emailTaken = emailTaken;
            console.log('the boolean for email: ,' + emailTaken);
            if (!this.usernameTaken && !this.emailTaken){
              console.log('they arent taken...');
              this.validUserFields = true;
            } else if (this.usernameTaken){
              this.openSnackBar('username is taken');
            } else {
              this.openSnackBar('email is taken');

            }
            if (this.validUserFields){
              this.goNext();
            }

          });
      });

    // this.newUser.phoneNumber = phoneNumber;
    // this.newUser.userId = 1;

  }
    goNext(){
    this.nextForm = true;
    }

  openSnackBar(status: string) {
    this.snackBar.open(status, 'close', {
      duration: 2500,
    });
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async signUp(username: string, password: string, email: string, stepper: MatStepper): Promise<void> {
    console.log('in the signup class');
    this.newUser = new User();
    this.newUser.email = email;
    this.newUser.password = password;
    this.newUser.username = username;
    // this.newUser.phoneNumber = phoneNumber;
    // this.newUser.userId = 1;
    console.log(this.newUser.username);
    this.userService.checkUsernameExists(username)
      .subscribe(usernameTaken => {
        this.usernameTaken = usernameTaken;
        console.log('the boolean for username: ,' + usernameTaken);
        this.userService.checkEmailExists(email)
          .subscribe(emailTaken => {
            this.emailTaken = emailTaken;
            console.log('the boolean for email: ,' + emailTaken);
            if (!this.usernameTaken && !this.emailTaken){
              console.log('they arent taken...');
              this.validUserFields = true;

              this.userService.attemptUserSave(this.newUser)
                .subscribe(async newUser => {
                  this.newUser = newUser;
                  if (this.newUser !== null){
                      this.showMore = true;

                  }
                  console.log(' the user details returned: ');
                  console.log('user Id; ' + this.newUser.userId);
                  console.log('username: ' + this.newUser.username);
                  console.log('email: ' + this.newUser.email);
                  // console.log('phone number: ' + this.newUser.phoneNumber);
                  if (this.newUser.username == '**') {
                    console.log('two equals');
                  }
                  if (this.newUser.username === '**') {
                    console.log('three equals');
                  }
                  if (this.newUser.username !== '**' && this.newUser.email !== '**') {
                    console.log('saved a user ' + this.newUser.userId);
                    console.log('userID: ' + this.newUser.userId);
                    sessionStorage.setItem('username', this.newUser.username);
                    sessionStorage.setItem('userId', this.newUser.userId.toString());
                    sessionStorage.setItem('email', this.newUser.email);
                    sessionStorage.setItem('loggedIn', String(this.loggedIn));
                    this.showMore = true;
                    this.openSnackBar('Account Created');
                    this.accountCreated = true;
                    this.twitterEditable = true;
                    await this.delay(1500);
                    stepper.next();
                    this.loggedIn = 'true';
                    sessionStorage.setItem('loggedIn', 'true');
                  } else {
                    console.log('null user');
                    console.log(this.newUser.username);
                    console.log(this.newUser.email);
                    console.log(this.newUser.phoneNumber);
                  }

                });

            } else if (this.usernameTaken){
              this.openSnackBar('username is taken');
            } else {
              this.openSnackBar('email is taken');

            }

          });
      });

  }

 async sendTwitterHandle(twitterHandle: string, stepper: MatHorizontalStepper) {
    console.log('*************************');
    console.log('sending twitter data!!!!!!');
    this.twitterData = new TwitterData();
    this.twitterData.userId = +sessionStorage.getItem('userId');
    this.twitterData.twitterHandle = twitterHandle;
    this.twitterService.sendUserTwitterData(this.twitterData)
      .subscribe(async twitterDataReturned => {
        if (twitterDataReturned === null) {
          console.log('return null twitter data');
          this.snackBar.open('Did not find that twitter handle..', 'close', {
            duration: 3200,
          });
        } else {
          console.log(twitterDataReturned);
          this.twitterData = twitterDataReturned;
          console.log(this.twitterData.twitterHandle);
          console.log(this.twitterData.followerCount);
          sessionStorage.setItem('twitterHandle', this.twitterData.twitterHandle);
          sessionStorage.setItem('twitterFollowerCount', this.twitterData.followerCount.toString());
          sessionStorage.setItem('twitterHandleFound', 'true');
          // sessionStorage.setItem('twitterHandle', twitter)
          this.snackBar.open('Found Your Handle', 'close', {
            duration: 2500,
          });
          await this.delay(1500);
          stepper.next();

        }
        this.twitterHandleFound = true;

      });
  }


  sendFacebookToken(value: string) {

  }

  sendInstagramCredentials(value: string, value2: string) {

  }

  getAuthorizationLink() {
    this.spotifyService.getAuthorizationLink().subscribe(authorizationLink => {
      this.authorizationLink = authorizationLink;
    });
    console.log('AuthorizationLink has been called');
    console.log(this.authorizationLink);
  }
  redirectToAuthorizationPage() {
    window.location.href = this.authorizationLink;
    this.logged = true;
  }

  completeStepper() {
    this.dialogRef.close();
    window.location.assign('/account-information');

  }
}
