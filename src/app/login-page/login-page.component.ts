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

  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  newUser: User;
  loggedIn: string;
  nameId: number;

  constructor(private userService: UserService, public snackBar: MatSnackBar) {
    this.loggedIn = sessionStorage.getItem('loggedIn');
  }

  ngOnInit(): void {
    this.nameId = +sessionStorage.getItem('userId');
  }
  openSnackBar(status: string) {
    if (status === 'success') {
      this.snackBar.open('Account Created', 'close', {
        duration: 3200,
      });
    } else {
      this.snackBar.open('Account creation fail', 'close', {
        duration: 3200,
      });
    }
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
            sessionStorage.setItem('username', this.newUser.username);
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
