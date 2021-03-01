import { Component, OnInit } from '@angular/core';
import {FacebookService} from '../service/facebook.service';
import {FacebookUser} from '../model/facebook/FacebookUser';
import {FacebookPosts} from '../model/facebook/FacebookPosts';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit{
  facebookUser: FacebookUser;
  facebookPosts: FacebookPosts;

  constructor(private facebookService: FacebookService) {
  }

  ngOnInit(): void {
  }

  getUsername(){
    this.facebookService.getUserName().subscribe(facebookUser => {
      this.facebookUser = facebookUser;
    });
    console.log('Get username method called');
    this.getPosts();
  }

  getPosts(){
    this.facebookService.getPosts().subscribe(facebookPosts => {
      this.facebookPosts = facebookPosts;
    });
    console.log('Get posts method called');
  }

}
/*
declare var FB: any;
@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // tslint:disable-next-line:only-arrow-functions
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '2959296474304941',
        cookie     : true,
        xfbml      : true,
        version    : 'v9.0'
      });
      FB.AppEvents.logPageView();
    };

    // tslint:disable-next-line:only-arrow-functions
    (function(d, s, id){
      // tslint:disable-next-line:one-variable-per-declaration prefer-const
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    FB.getLoginStatus((response) => {
      this.submitLogin();
    });
  }

  submitLogin(){
    console.log('User attempting to log in to Facebook');
    // FB.login();
    // tslint:disable-next-line:no-shadowed-variable
    FB.login((response) =>
    {
      console.log('submitLogin', response);
      if (response.authResponse)
      {
        console.log('Logged in Successfully');
        console.log('Access Token: ' + response.authResponse.accessToken);
        this.testAPI();
        this.setElements(true);
      }
      else
      {
        console.log('User login failed');
        this.setElements(false);
      }
    });

  }

   testAPI(){
    FB.api('/me?fields=name,email, birthday, location', (response) => {
      if (response && !response.error) {
        console.log('Name: ' + response.name);
        console.log('Email: ' + response.email);
        this.buildProfile(response);
      }
    });
  }

   buildProfile(user){
    const profile = `
          <h1>${user.name}</h1>
          <ul class="list-group">
            <li class="list-group-item">User ID: ${user.id}</li>
            <li class="list-group-item">Email: ${user.email}</li>
          </ul>
        `;
    document.getElementById('profile').innerHTML = profile;
  }

   logout(){
    FB.logout((response) => {
      console.log('User has logged out');
      this.setElements(false);
    });
  }

   setElements(isLoggedIn){
    if (isLoggedIn){
      document.getElementById('fb-btn').style.display = 'none';
      document.getElementById('logout').style.display = 'block';
      document.getElementById('profile').style.display = 'block';
    } else {
      document.getElementById('fb-btn').style.display = 'block';
      document.getElementById('logout').style.display = 'none';
      document.getElementById('profile').style.display = 'none';
    }
  }

}


 */
