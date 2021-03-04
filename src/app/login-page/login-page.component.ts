import { Component, OnInit } from '@angular/core';
import {User} from '../model/user/User';
import {UserService} from '../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, Form} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {SimpleFormComponent} from '../simple-form/simple-form.component';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

//user-data.ts
export class UserData {
  constructor(
    public primaryAddress: string,
    s: string){}
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loggedInBool: boolean;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  newUser: User;
  loggedIn: string;
  nameId: number;
  userId: number;
  parameterTaken: string;
  addressId: number;
  user: User;
  myForm: FormGroup;
  userModel = new UserData('', '');
  accountCreated: boolean;

  matcher = new MyErrorStateMatcher();

  userEmails = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
  });

  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, public snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.loggedIn = sessionStorage.getItem('loggedIn');
    this.accountCreated = false;
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

  }

  ngOnInit(): void {
    console.log('onit');
    this.loggedIn = sessionStorage.getItem('loggedIn');
    this.nameId = +sessionStorage.getItem('userId');
    // console.log(this.loggedIn.toString());
  }
  logOut() {
    this.loggedInBool = false;
    // this.user = null;
    sessionStorage.clear();
    window.location.reload();
  }
  // openSnackBar(status: string) {
  //   if (status === 'success') {
  //     this.snackBar.open('Account Created', 'close', {
  //       duration: 3200,
  //     });
  //   } else {
  //     this.snackBar.open('Account Creation Failed', 'close', {
  //       duration: 3200,
  //     });
  //   }
  // }
  openSnackBar(status: string) {
      this.snackBar.open(status, 'close', {
        duration: 3200,
      });
  }
  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async add(username: string, password: string, email: string, firstName: string, lastName: string, phoneNumber: string): Promise<void> {

    this.newUser = new User();
    this.newUser.email = email;
    this.newUser.password = password;
    this.newUser.username = username;
    this.newUser.phoneNumber = phoneNumber;
    // this.newUser.userId = 1;
    console.log(this.newUser.username);
    this.userService.saveUser(this.newUser)
      .subscribe(async newUser => {
        this.newUser = newUser;
        console.log(' the user details returned: ');
        console.log('user Id; ' + this.newUser.userId);
        console.log('username: ' + this.newUser.username);
        console.log('email: ' + this.newUser.email);
        console.log('phone number: ' + this.newUser.phoneNumber);
        if ( this.newUser.username == '**'){
          console.log('two equals');
        }
        if ( this.newUser.username === '**'){
          console.log('three equals');
        }
        if (this.newUser.username !== '**' && this.newUser.email !== '**' && this.newUser.phoneNumber !== '**') {
        console.log('saved a user ' + this.newUser.userId);
        console.log('userID: ' + this.newUser.userId);
        sessionStorage.setItem('username', this.newUser.username);
        sessionStorage.setItem('userId', this.newUser.userId.toString());
        this.openSnackBar('Account Created');
        this.accountCreated = true;
        await this.delay(2000);
        window.location.assign('/account-information');
      } else {
              console.log('null user');
              console.log(this.newUser.username);
              console.log(this.newUser.email);
              console.log(this.newUser.phoneNumber);
              if (this.newUser.username === '**'){
                this.parameterTaken = 'Username';
          } else if (this.newUser.email === '**'){
                this.parameterTaken = 'Email';
              }  else if (this.newUser.phoneNumber === '**'){
          this.parameterTaken = 'Phone Number';
        }
              this.openSnackBar('Account Creation Failed: ' + this.parameterTaken + ' Taken');

        }

      //   if (this.newUser.username !== null) {
      //     console.log('not a null user');
      //     sessionStorage.setItem('username', this.newUser.username);
      //     sessionStorage.setItem('userId', this.newUser.userId.toString());
      // } else {
      //     console.log('null user');
      //     console.log(this.newUser.username);
      //     console.log(this.newUser.email);
      //     console.log(this.newUser.phoneNumber);
      //   }
      //   if (this.newUser.username !== null || this.newUser.email !== null || this.newUser.phoneNumber !== null) {
      //     console.log('they arent null');
      //     window.location.assign('/twitter');
      //     this.openSnackBar('Account Created');
      //   } else {
      //     if (this.newUser.username == null) {
      //       this.parameterTaken = 'Username';
      //     } else if (this.newUser.phoneNumber == null) {
      //       this.parameterTaken = 'Phone Number';
      //     } else if (this.newUser.email == null) {
      //       this.parameterTaken = 'Email';
      //     }
      //     this.openSnackBar('Account Creation Failed: ' + this.parameterTaken + ' Taken');
      //   }
      //   //   console.log('failed!')
      //   //   this.parameterTaken = 'Username';
      //   //   this.openSnackBar('Account Creation Failed: Username Taken');
      //   // } else {
      //   //   this.openSnackBar('Account Created');
      //   // }
          });

    // this.id = sessionStorage.getItem(('studentId'));
    // this.userService.postUser(this.newUser, +this.newUser.studentId)
    //   .subscribe(newUser => {
    //     this.newUser = newUser;
    //   });
    // if(this.newUser == null){
    //   this.openSnackBar('fail');
    // } else {
    //   this.openSnackBar('success');
    // }
  }

  changeWindow() {
    window.location.assign('/twitter');
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
}
