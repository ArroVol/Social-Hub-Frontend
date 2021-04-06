import { Component, OnInit } from '@angular/core';
import {FacebookService} from '../service/facebook.service';
import {FacebookUser} from '../model/facebook/FacebookUser';
import {FacebookPhotos} from '../model/facebook/FacebookPhotos';
import { ActivatedRoute } from '@angular/router';
import {FacebookLogin} from '../model/facebook/FacebookLogin';
import {FacebookPages} from '../model/facebook/FacebookPages';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
/**
 * The Class for the dashboard component.
 */
export class DashboardComponent implements OnInit {
  facebookUser: FacebookUser;
  facebookLogin: FacebookLogin;
  facebookPhotos: FacebookPhotos;
  facebookPages: FacebookPages;
  verificationCode: string;
  constructor(protected route: ActivatedRoute, protected facebookService: FacebookService) {
  }

  ngOnInit(): void {
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
            this.getFBUsername();
            this.getFBPhotos();
            this.getFBPages();
            document.getElementById('fbCard').style.display = 'block';
            document.getElementById('fbCardLogin').style.display = 'none';
          });
      }
    });
  }

  loginFB(){
    this.facebookService.login().subscribe(loginDialogURL => {
      this.facebookLogin = loginDialogURL;
    });
    window.location.href = this.facebookLogin.loginDialogURL;
  }

  getFBUsername(){
    this.facebookService.getUserName().subscribe(facebookUser => {
      this.facebookUser = facebookUser;
    });
    console.log('Get username method called');
  }

  getFBPhotos(){
    this.facebookService.getPhotos().subscribe(facebookPhotos => {
      this.facebookPhotos = facebookPhotos;
    });
    console.log('Get photos method called');
  }

  getFBPages(){
    this.facebookService.getPages().subscribe(facebookPages => {
      this.facebookPages = facebookPages;
    });
    console.log('Get pages method called');
  }

}
