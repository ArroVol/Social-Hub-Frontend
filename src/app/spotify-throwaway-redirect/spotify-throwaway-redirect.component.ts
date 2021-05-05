import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-spotify-throwaway-redirect',
  templateUrl: './spotify-throwaway-redirect.component.html',
  styleUrls: ['./spotify-throwaway-redirect.component.css']
})
export class SpotifyThrowawayRedirectComponent implements OnInit {
  @Output() spotifyUserLogged = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    sessionStorage.setItem('spotify_user_logged', 'true');
    this.spotifyUserLogged.emit(true);
    window.close();
  }

}
