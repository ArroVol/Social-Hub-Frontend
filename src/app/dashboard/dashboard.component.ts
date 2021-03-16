import { Component, OnInit } from '@angular/core';
import {InstagramService} from '../service/instagram.service';
import {InstagramUserInfo} from '../model/instagram/InstagramUserInfo';
import {InstagramComponent} from '../instagram/instagram.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
/**
 * The Class for the dashboard component.
 */
export class DashboardComponent extends InstagramComponent implements OnInit {



  instagramUser: InstagramUserInfo;


  ngOnInit(): void {
    this.getInstaUser();
  }

}
