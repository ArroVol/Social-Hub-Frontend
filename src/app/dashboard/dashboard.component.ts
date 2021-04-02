import { Component, OnInit } from '@angular/core';
import {FacebookService} from '../service/facebook.service';
import {FacebookUser} from '../model/facebook/FacebookUser';
import {FacebookPhotos} from '../model/facebook/FacebookPhotos';
import {FacebookComponent} from '../facebook/facebook.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
/**
 * The Class for the dashboard component.
 */
export class DashboardComponent extends FacebookComponent implements OnInit {
  facebookUser: FacebookUser;
  ngOnInit(): void {
    this.getUsername();
    this.getPages();
    this.getPhotos();
  }

}
