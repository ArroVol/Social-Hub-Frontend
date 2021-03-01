import { Component, OnInit } from '@angular/core';
import {User} from '../model/user/User';
import {UserService} from '../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  phoneNumber: string;
  newUser: User;
  loggedIn: string;
  nameId: number;
  parameterTaken: string;
  addressId: number;

  constructor(private userService: UserService, public snackBar: MatSnackBar) {
    this.loggedIn = sessionStorage.getItem('loggedIn');
  }

  ngOnInit(): void {
    this.loggedIn = sessionStorage.getItem('loggedIn');
    this.nameId = +sessionStorage.getItem('userId');
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

  add(username: string, password: string, email: string, firstName: string, lastName: string, phoneNumber: string): void {
    console.log(username);
    this.password = password;
    this.email = email;
    this.username = username;
    this.phoneNumber = phoneNumber;

    // tslint:disable-next-line:label-position
    this.newUser = new User();
    this.newUser.email = email;
    this.newUser.password = password;
    this.newUser.username = username;
    this.newUser.phoneNumber = phoneNumber;
    console.log(this.newUser.username);
    // this.newUser.firstName = firstName;
    // this.newUser.lastName = lastName;
    this.userService.saveUser(this.newUser)
      .subscribe(newUser => {
        this.newUser = newUser;
        if (this.newUser.username !== null) {
          console.log('not a null user');
          sessionStorage.setItem('username', this.newUser.username);
      } else {
          console.log('null user');
        }
        if (this.newUser.username != null || this.newUser.email != null || this.newUser.phoneNumber != null) {
          this.openSnackBar('Account Created');
        } else {
          if (this.newUser.username) {
            this.parameterTaken = 'Username';
          } else if (this.newUser.phoneNumber) {
            this.parameterTaken = 'Phone Number';
          } else if (this.newUser.email) {
            this.parameterTaken = 'Email';
          }
          this.openSnackBar('Account Creation Failed: ' + this.parameterTaken + ' Taken');
        }
        //   console.log('failed!')
        //   this.parameterTaken = 'Username';
        //   this.openSnackBar('Account Creation Failed: Username Taken');
        // } else {
        //   this.openSnackBar('Account Created');
        // }
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
}
