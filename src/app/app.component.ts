import {Component, ViewChild} from '@angular/core';
import {NavbarService} from './service/navbar.service';
import {TwitterService} from './service/twitter.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {AngularFirestore} from "@angular/fire/firestore";
import {MatSidenav} from "@angular/material/sidenav";
import {UserService} from "./service/user.service";
import {SimpleFormComponent} from "./simple-form/simple-form.component";
// import * as moment from 'moment';



// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * The index page of the project.
 */
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  //invoke the value changes to invoke and subscribe to an observable
  todo = this.store.collection('todo').valueChanges({ idField: 'id'});
  profileImages = this.store.collection('profileImages').valueChanges({ idField: 'id'});
  onePostImages = this.store.collection('onePostImages').valueChanges({ idField: 'id'});

  sideNav: Promise<string>|null = null;
  displaySideNav = false;
  private resolve: Function|null = null;
  allowSideNav: boolean;
  title = 'Social Hub Club';
  hide = false;
  template: `
  <img src="../../images/instagramIcon.png">
`;
  sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();
  isSidebarVisible: boolean;
  // loggedIn: string;
  loggedIn = false;
  loggedIn$ = new BehaviorSubject(this.loggedIn);

  constructor(private store: AngularFirestore, private userService: UserService,
              ) {
    this.reset();

  }
  reset() {
    this.displaySideNav = false;
    this.sideNav = new Promise<string>((resolve, reject) => {
      this.resolve = resolve;
    });
  }

  toggleSidebarVisibility() {
    this.sidebarVisibilityChange.next(!this.isSidebarVisible);
  }

  /**
   * On page open get the recent post from the user and the number of followers.
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.getIsSideBarVisible();
    // this.loggedIn = false;
    console.log('init..');
    console.log(window.location.href);
    if (window.location.href === 'http://localhost:4200/main'){
      console.log('we are on the main page');
      this.displaySideNav = false;
    }
    if (sessionStorage.getItem('loggedIn') === 'true') {
      console.log('logged in....');
      this.loggedIn = true;
    } else {
      console.log('not logged in');
    }
    if (sessionStorage.getItem('userId') !== null) {
      console.log('user id not null');
      // this.loggedIn = 'true';
    }
    // this.userService.getUserById(1)

  }

  getIsSideBarVisible() {
    console.log('getting the side bars visibility');
    console.log(this.displaySideNav);
    // this.displaySideNav = this.simpleFormComponent.isSidebarVisible;
    console.log(this.displaySideNav);

  }

  close(reason: string) {
    // this.reason = reason;
    console.log('clicked close');
    this.sidenav.close();
  }

  open(){
    console.log('clicked open');

  }

  checkLogin() {
    console.log('checking login.......');
    console.log('*****"');
    if (sessionStorage.getItem('loggedIn') === 'true') {
      console.log('logged in....');
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  set login(value) {
    this.loggedIn = value;
    this.loggedIn$.next(this.loggedIn);
  }

  get filter() {
    return this.loggedIn$.asObservable();
  }



}
