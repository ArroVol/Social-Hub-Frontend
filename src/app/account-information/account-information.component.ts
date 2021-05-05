import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../model/user/User';
import {UserService} from '../service/user.service';
import {MatSort} from '@angular/material/sort';
// @ts-ignore
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SecureTwitter} from '../model/twitter/SecureTwitter';
import {TwitterService} from '../service/twitter.service';
import {MatRadioChange} from '@angular/material/radio';
import {Preferences} from '../model/user/Preferences';
import {PreferencesService} from '../service/preferences.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TwitterData} from '../model/twitter/TwitterData';
import {UserData} from '../login-page/login-page.component';
import {AppComponent} from '../app.component';
// import {MDCTextField} from '@material/textfield';

//user-data.ts
export class TwitterUserData {
  constructor(
    public handle: string,
    s: string){}
}
// @ts-ignore
@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.css']
})

export class AccountInformationComponent implements OnInit {
  flag: any;
  social: any;
  twitterDataReturned: TwitterData;
  checked = false;
  indeterminate = false;
  labelPosition: string;
  disabled = false;
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
  numberId: number;
  socialOnStart: string;
  radioChoice: string;
  developerOptions: boolean;
  userId: number;
  twitterLoggedIn: string;
  showHideDeveloper: boolean;
  preferences: Preferences;
  twitterData: TwitterData;
  twitterHandleFound: boolean;
  twitterHandleSave: string;
  // social: string;
  Twitter: any;
  Facebook: any;
  Spotify: any;
  twitterModel = new TwitterUserData('', '');

  displayHandleChangeDiv: boolean;


  twitterRegistered: boolean;
  secureInformation: SecureTwitter;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  headElements = ['Username', 'Email', 'Password', 'Phone Number'];
  user: User;
  newUser: User;
  userSaved = false;
  twitterSetup = false;

  twitterDevModeSetUp: boolean;
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
    if (sessionStorage.getItem('username') != null) {
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
        this.checkIfTwitterDeveloper();
      });
  }

  displayElements() {
    this.arr = new Array<string>(4);
    console.log('in display elements');
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
  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private twitterService: TwitterService, private preferencesService: PreferencesService, public snackBar: MatSnackBar, private appComponent: AppComponent) {
    this.displayHandleChangeDiv = false;
  }

  ngOnInit(): void {
    this.userId = +sessionStorage.getItem('userId');
    console.log('on initialize in account information.ts');
    console.log(sessionStorage.getItem('userId'));
    console.log(sessionStorage.getItem('username'));
    this.appComponent.displaySideNav = true;
    this.socialOnStart = sessionStorage.getItem('socialOnStart');
    this.developerOptions = false;
    this.displayHandleChangeDiv = false;
    this.twitterHandleFound = Boolean(sessionStorage.getItem('twitterHandleFound'));

    if (sessionStorage.getItem('twitterHandle') !== null) {
      console.log('handle not null');
      this.twitterLoggedIn = 'true';
    }
    this.getPreferences();
    this.checkLogin();
    this.getUser();
    this.checkTwitterRegistered();
    this.getTwitterData();
    this.social = 'Twitter';
  }

  checkLogin() {
    if (sessionStorage.getItem('username') != null) {
      this.userSaved = true;
    }
  }

  sendConsumerKey(consumerKey: string, consumerSecret: string, accessToken: string, accessTokenSecret: string, twitterHandle: string) {
    console.log('session storage of user Id: ' + sessionStorage.getItem('userId'));
    // this.numberId = +sessionStorage.getItem('userId');
    this.secureInformation = new SecureTwitter();
    this.secureInformation.userId = sessionStorage.getItem('userId');
    // this.secureInformation.userId = this.numberId;
    this.secureInformation.consumerKey = consumerKey;
    this.secureInformation.consumerSecret = consumerSecret;
    this.secureInformation.accessToken = accessToken;
    this.secureInformation.accessTokenSecret = accessTokenSecret;
    this.secureInformation.twitterHandle = twitterHandle;

    this.twitterService.sendSecure(this.secureInformation)
      .subscribe(secureInformation => {
        this.secureInformation = secureInformation;
        sessionStorage.setItem('twitterHandle', twitterHandle);
        if (this.secureInformation === null) {
          console.log('its null');
        } else {
          console.log(this.secureInformation.userId);
          console.log(this.secureInformation.twitterHandle);
          this.twitterRegistered = true;
          this.twitterLoggedIn = 'true';
          this.developerOptions = true;
          sessionStorage.setItem('developerModeEnabled', 'true');
        }
      });

  }

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  private checkTwitterRegistered() {
    this.userId = +sessionStorage.getItem('userId');
    console.log('checking registered for twitter user id: ' + this.userId);
    if (this.userId !== null) {
      // this.twitterService
    }
  }

  radioChange($event: MatRadioChange) {
    // this.socialOnStart = $event.value;
    this.radioChoice = $event.value;
    console.log(this.radioChoice);
    console.log(this.socialOnStart);

  }

  saveSocialStartUp() {
    console.log(this.radioChoice);

    if (this.radioChoice !== undefined) {
      console.log('radio choice selected');
      this.socialOnStart = this.radioChoice;
      sessionStorage.setItem('socialOnStart', this.socialOnStart);
      console.log('preferences changed');
      this.preferences.onLogin = sessionStorage.getItem('socialOnStart');
      this.preferences.userId = +sessionStorage.getItem('userId');
      this.preferencesService.savePreferences(this.preferences)
        .subscribe(preferences => {
          this.preferences = preferences;
          if (this.preferences === null) {
            console.log('preferences are null');
          } else {
            console.log(this.preferences.userId);
            console.log(this.preferences.onLogin);
            this.socialOnStart = this.preferences.onLogin;
            console.log(this.socialOnStart);
            this.snackBar.open('Saved Home Page Preference', 'close', {
              duration: 3200,
            });
          }
        });

    } else {
      this.snackBar.open('No Page Preference Selected', 'close', {
        duration: 2200,
      });
    }
    // sessionStorage.setItem('socialOnStart', this.socialOnStart);
    // if (sessionStorage.getItem('socialOnStart') !== null){
    //   console.log('preferences changed');
    // }
  }

  getPreferences() {
    console.log('getting preferences');
    this.preferencesService.getPreferencesById(sessionStorage.getItem('userId'))
      .subscribe(preferences => {
        this.preferences = preferences;
        if (this.preferences === null) {
          console.log('preferences are null');
          this.socialOnStart = null;
          this.preferences = new Preferences();
        } else {
          console.log(this.preferences.userId);
          console.log(this.preferences.onLogin);
          // sessionStorage.setItem()
          this.socialOnStart = this.preferences.onLogin;
          console.log(this.socialOnStart);
        }
      });
  }

  launchUpdateAccountPage() {
    window.location.assign('/login-page');

  }

  showDeveloperOptions() {
    console.log('show dev options..');
    this.developerOptions = true;
  }

  sendTwitterHandle(twitterHandle: string) {
    console.log('*************************');
    console.log('sending twitter data!!!!!!');
    this.twitterData = new TwitterData();
    this.twitterData.userId = +sessionStorage.getItem('userId');
    this.twitterData.twitterHandle = twitterHandle;
    this.twitterService.sendUserTwitterData(this.twitterData)
      .subscribe(twitterDataReturned => {
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
          sessionStorage.setItem('twitterHandle', this.twitterModel.handle);
          sessionStorage.setItem('twitterFollowerCount', this.twitterData.followerCount.toString());
          sessionStorage.setItem('twitterHandleFound', 'true');
          // sessionStorage.setItem('twitterHandle', twitter)
          this.snackBar.open('Found Your Handle', 'close', {
            duration: 3200,
          });
        }
        this.twitterHandleFound = true;

      });
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
        sessionStorage.setItem('twitterHandleFound', 'true');
      });
  }

  checkDefault(social: any): boolean {

    if (this.socialOnStart === social){
      return true;
    }
    return false;
  }

  changeToDifferentHandle() {
    this.displayHandleChangeDiv = true;

  }

  checkIfTwitterDeveloper(){
    this.twitterService.checkTwitterRegistered(this.userId)
      .subscribe(userId => {
        if (userId !== -1) {
          console.log('the user exists and has set up developer mode for twitter');
          this.twitterDevModeSetUp = true;
        }

      });
  }

}
