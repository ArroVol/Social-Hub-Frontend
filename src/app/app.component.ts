import { Component } from '@angular/core';
import {NavbarService} from './service/navbar.service';

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
  template: `
  <img src="../../images/instagramIcon.png">
`;
}
