import { Component, OnInit } from '@angular/core';
import {FacebookService} from '../service/facebook.service';
import {FacebookUser} from '../model/facebook/FacebookUser';
import {FacebookPosts} from '../model/facebook/FacebookPosts';
import {FacebookPhotos} from '../model/facebook/FacebookPhotos';
import {FacebookLogin} from '../model/facebook/FacebookLogin';
import {FacebookPages} from '../model/facebook/FacebookPages';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit{
  facebookUser: FacebookUser;
  facebookPosts: FacebookPosts;
  facebookPhotos: FacebookPhotos;
  facebookLogin: FacebookLogin;
  facebookPages: FacebookPages;
  verificationCode: string;
  loggedIn: boolean;
  currentPage: string;

  constructor(private snackBar: MatSnackBar, protected route: ActivatedRoute, protected facebookService: FacebookService) {
  }

  ngOnInit(): void {
    this.getUsername();
    this.getPosts();
    this.getPhotos();
    this.getPages();
    document.getElementById('fb-btn').style.display = 'none';
    document.getElementById('fb-btn2').style.display = 'block';
    document.getElementById('fb-btn3').style.display = 'block';
    document.getElementById('postForm').style.display = 'block';
    document.getElementById('head').style.display = 'block';
    document.getElementById('container').style.display = 'block';
    document.getElementById('container2').style.display = 'block';
    document.getElementById('postTitle').style.display = 'block';
    document.getElementById('pageTitle').style.display = 'block';
    document.getElementById('likeTitle').style.display = 'block';


    //Get verification code
    /**
    this.route.queryParams.subscribe(params => {
      let code = params['code'];
      if (!code){
        console.log('No code found');
      } else{
        this.loggedIn = true;
        console.log(this.loggedIn);
        this.verificationCode = code;
        console.log('This is the code: ' + this.verificationCode);
        this.facebookService.sendVerificationCode(this.verificationCode)
          .subscribe(result => {
            console.log('Result: ', result);
            this.getUsername();
            this.getPosts();
            this.getPhotos();
            this.getPages();
          });
        document.getElementById('fb-btn').style.display = 'none';
        document.getElementById('fb-btn2').style.display = 'block';
        document.getElementById('fb-btn3').style.display = 'block';
        document.getElementById('postForm').style.display = 'block';
        document.getElementById('head').style.display = 'block';
        document.getElementById('container').style.display = 'block';
        document.getElementById('container2').style.display = 'block';
        document.getElementById('postTitle').style.display = 'block';
        document.getElementById('pageTitle').style.display = 'block';
        document.getElementById('likeTitle').style.display = 'block';

        this.loggedIn = true;
      }
    });
*/
  }

  submitPost(s: string){
    console.log(s);
    s += '*' + this.currentPage;
    console.log('Current Page is: ' + this.currentPage);
    this.facebookService.sendPostMessage(s)
      .subscribe(result => {
        console.log('Message Sent');
        this.openSnackBar('Post Successfully Created', 'Done');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  login(){
    this.facebookService.login().subscribe(loginDialogURL => {
      this.facebookLogin = loginDialogURL;
    });
    window.location.href = this.facebookLogin.loginDialogURL;
  }

  logout(){
    this.facebookService.login().subscribe(loginDialogURL => {
      this.facebookLogin = loginDialogURL;
    });
    window.open(this.facebookLogin.logoutDialogURL);
    window.location.href = 'http://localhost:4200/dashboard';
    console.log('Logout called');
    document.getElementById('fb-btn').style.display = 'block';
    document.getElementById('fb-btn2').style.display = 'none';
    document.getElementById('fb-btn3').style.display = 'none';
    document.getElementById('postForm').style.display = 'none';
    document.getElementById('head').style.display = 'none';
    document.getElementById('container').style.display = 'none';
    document.getElementById('container2').style.display = 'none';
    document.getElementById('postTitle').style.display = 'none';
    document.getElementById('pageTitle').style.display = 'none';
    document.getElementById('likeTitle').style.display = 'none';
  }

  getUsername(){
    this.facebookService.getUserName().subscribe(facebookUser => {
      this.facebookUser = facebookUser;
    });
    console.log('Get username method called');
  }

  getPosts(){
    this.facebookService.getPosts().subscribe(facebookPosts => {
      this.facebookPosts = facebookPosts;
    });
    console.log('Get posts method called');
  }

  getPhotos(){
    this.facebookService.getPhotos().subscribe(facebookPhotos => {
      this.facebookPhotos = facebookPhotos;
    });
    console.log('Get photos method called');
  }

  getPages(){
    this.facebookService.getPages().subscribe(facebookPages => {
      this.facebookPages = facebookPages;
    });
    console.log('Get pages method called');
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
