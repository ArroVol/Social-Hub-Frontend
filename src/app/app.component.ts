// @ts-ignore
import { Component } from '@angular/core';
import {NavbarService} from './service/navbar.service';
import {TwitterService} from './service/twitter.service';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';

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
  sideNav: Promise<string>|null = null;
  displaySideNav = false;
  private resolve: Function|null = null;

  title = 'Social Hub Club';
  hide = false;

  // loggedIn: string;
  loggedIn = false;
  loggedIn$ = new BehaviorSubject(this.loggedIn);

  constructor() {
    this.reset();
  }
  reset() {
    this.displaySideNav = false;
    this.sideNav = new Promise<string>((resolve, reject) => {
      this.resolve = resolve;
    });
  }

  /**
   * On page open get the recent post from the user and the number of followers.
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
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
