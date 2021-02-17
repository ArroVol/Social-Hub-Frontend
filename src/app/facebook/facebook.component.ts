import { Component, OnInit } from '@angular/core';

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
  }

  submitLogin(){
    console.log('User attempting to log in to Facebook');
    // FB.login();
    FB.login((response) =>
    {
      console.log('submitLogin', response);
      if (response.authResponse)
      {
        console.log('User Logged in Successfully');
      }
      else
      {
        console.log('User login failed');
      }
    });

  }

}
