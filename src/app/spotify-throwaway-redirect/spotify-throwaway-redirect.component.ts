import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-spotify-throwaway-redirect',
  templateUrl: './spotify-throwaway-redirect.component.html',
  styleUrls: ['./spotify-throwaway-redirect.component.css']
})
export class SpotifyThrowawayRedirectComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    window.close();
  }

}
