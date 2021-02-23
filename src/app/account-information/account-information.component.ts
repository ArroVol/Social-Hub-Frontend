import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../model/user/User';
import {UserService} from '../service/user.service';
import {any} from 'codelyzer/util/function';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
// import {MDCTextField} from '@material/textfield';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.css']
})
export class AccountInformationComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  headElements = ['Username', 'Email', 'Password', 'Phone Number'];
  user: User;
  newUser: User;
  userSaved = false;
  twitterSetup = false;

  displayedColumns: string[] = ['username', 'email', 'password', 'phoneNumber'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listData: string[];

  elements: any = [
    {username: 'y', email: 'Mark', password: 'Otto', phoneNumber: '@mdo'},
    {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
    {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
  ];
  userData: string[];
  arr = new Array<string>(4);

  getUser() {
    console.log('**************');
    console.log(sessionStorage.getItem('username'));
    if (sessionStorage.getItem('username') != null){
      this.userSaved = true;
    }
    this.userService.getUserByUsername(sessionStorage.getItem('username'))
      .subscribe(user => {
        console.log('getting the users username: ' + user.username);
        this.user = new User();
        this.user.username = user.username;
        this.user.email = user.email;
        this.user.password = user.password;
        this.user.phoneNumber = user.phoneNumber;
        this.displayElements();
      });
  }

  displayElements() {
    this.arr = new Array<string>(4);
    console.log('in dispaly elements');
    console.log(this.user.username);
    this.arr [0] = this.user.username;
    this.arr [1] = this.user.email;
    this.arr [2] = this.user.password;
    this.arr [3] = this.user.phoneNumber;
    this.listData = this.arr;
    // tslint:disable-next-line:label-position
  }

  // add(username: string, password: string, email: string, firstName: string, lastName: string, phoneNumber: string): void {
  //   console.log(username);
  //   this.password = password;
  //   this.email = email;
  //   this.username = username;
  //   this.phoneNumber = phoneNumber;
  //
  //   // tslint:disable-next-line:label-position
  //   this.newUser = new User();
  //   this.newUser.email = email;
  //   this.newUser.password = password;
  //   this.newUser.username = username;
  //   this.newUser.phoneNumber = phoneNumber;
  //   console.log(this.newUser.username);
  //   // this.newUser.firstName = firstName;
  //   // this.newUser.lastName = lastName;
  //   this.userService.saveUser(this.newUser)
  //     .subscribe(newUser => {
  //       this.newUser = newUser;
  //     });
  //   // this.id = sessionStorage.getItem(('studentId'));
  //   // this.userService.postUser(this.newUser, +this.newUser.studentId)
  //   //   .subscribe(newUser => {
  //   //     this.newUser = newUser;
  //   //   });
  //   // if(this.newUser == null){
  //   //   this.openSnackBar('fail');
  //   // } else {
  //   //   this.openSnackBar('success');
  //   // }
  // }

  // textField = new MDCTextField(document.querySelector('.mdc-text-field'));
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.checkLogin();
    this.getUser();
  }
  checkLogin(){
    if (sessionStorage.getItem('username') != null){
      this.userSaved = true;
    }
  }

  sendConsumerKey(value: any, value2: any, value3: any, value4: any) {
    
  }
}
