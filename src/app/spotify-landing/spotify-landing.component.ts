import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../service/spotify.service';
@Component({
  selector: 'app-spotify-landing',
  templateUrl: './spotify-landing.component.html',
  styleUrls: ['./spotify-landing.component.css']
})
export class SpotifyLandingComponent implements OnInit {

  authorizationLink: string;
  logged: boolean = false;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getAuthorizationLink();
  }

  getAuthorizationLink() {
    this.spotifyService.getAuthorizationLink().subscribe(authorizationLink => {
      this.authorizationLink = authorizationLink;
    });
    console.log('AuthorizationLink has been called');
    console.log(this.authorizationLink);
  }

  redirectToAuthorizationPage() {
    window.location.href = this.authorizationLink;
    this.logged = true;
  }
}
