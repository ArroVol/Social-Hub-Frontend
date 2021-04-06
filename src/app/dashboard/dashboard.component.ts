import { Component, OnInit } from '@angular/core';
import {FacebookService} from '../service/facebook.service';
import {FacebookUser} from '../model/facebook/FacebookUser';
import {FacebookPhotos} from '../model/facebook/FacebookPhotos';
import {FacebookComponent} from '../facebook/facebook.component';
import { ActivatedRoute } from '@angular/router';


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
    if (this.facebookUser !== undefined){
      console.log(this.facebookUser);
      document.getElementById('fbCard').style.display = 'block';
      document.getElementById('fbCardLogin').style.display = 'none';
    }
    this.route.queryParams.subscribe(params => {
      let code = params['code'];
      if (!code){
        console.log('No code found');
      } else{
        this.verificationCode = code;
        console.log('This is the code: ' + this.verificationCode);
        this.facebookService.sendVerificationCode(this.verificationCode)
          .subscribe(result => {
            console.log('Result: ', result);
            this.getUsername();
            this.getPhotos();
            this.getPages();
            document.getElementById('fbCard').style.display = 'block';
            document.getElementById('fbCardLogin').style.display = 'none';
          });
      }
    });
  }

}
