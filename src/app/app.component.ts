import { Component } from '@angular/core';
import {NavbarService} from './service/navbar.service';
import {TwitterService} from './service/twitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * The index page of the project.
 */
export class AppComponent {
  title = 'Social Hub Club';
  hide = false;

  loggedIn: string;

  constructor() {
  }

  /**
   * On page open get the recent post from the user and the number of followers.
   */
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    if (sessionStorage.getItem('userId') !== null){
      console.log('user id not null');
      this.loggedIn = 'true';
    }
  }
}
