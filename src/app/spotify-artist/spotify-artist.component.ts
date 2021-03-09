import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {SpotifyService} from "../service/spotify.service";
import {MatDialog} from "@angular/material/dialog";
import {MatAccordion} from "@angular/material/expansion";
import {SpotifyPlaylist} from "../model/spotify/SpotifyPlaylist";
import {SpotifyUser} from "../model/spotify/SpotifyUser";
import {SpotifyAlbum} from "../model/spotify/SpotifyAlbum";
import {SpotifyTrack} from "../model/spotify/SpotifyTrack";
import {SpotifyArtist} from "../model/spotify/SpotifyArtist";
import {SpotifyCreatePlaylistComponent} from "../spotify-create-playlist/spotify-create-playlist.component";

@Component({
  selector: 'app-spotify-artist',
  templateUrl: './spotify-artist.component.html',
  styleUrls: ['./spotify-artist.component.css']
})
export class SpotifyArtistComponent implements OnInit {

  @ViewChild(MatAccordion) artistAccordion: MatAccordion;
  spotifyUserPlaylist: SpotifyPlaylist[];
  userProfile: SpotifyUser;
  spotifyArtist: SpotifyArtist;
  artistAlbums: SpotifyAlbum[];
  artistTopTracks: SpotifyTrack[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let artist_id = this.route.snapshot.queryParamMap.get('id')
      this.getArtistById(artist_id);
      this.getArtistTopTracks(artist_id);
      this.getArtistAlbums(artist_id);
      this.getUserPlaylist();
      this.getUserProfile();
    })
  }

  getArtistTopTracks(artist_id: string) {
    this.spotifyService.getArtistTopTracks(artist_id).subscribe(spotifyTracks => {
      this.artistTopTracks = spotifyTracks;
      console.log('spotifyTracks', spotifyTracks);
    });
  }

  getArtistById(artist_id: string) {
    this.spotifyService.getArtistById(artist_id).subscribe(spotifyArtist => {
      this.spotifyArtist = spotifyArtist;
      console.log('spotifyArtist', spotifyArtist);
    });
  }

  getArtistAlbums(artist_id: string) {
    this.spotifyService.getArtistAlbums(artist_id).subscribe(artistAlbums => {
      this.artistAlbums = artistAlbums;
      console.log('artistAlbums', artistAlbums);
    });
  }

  getUserPlaylist() {
    this.spotifyService.getUserPlaylist().subscribe(spotifyUserPlaylist => this.spotifyUserPlaylist = spotifyUserPlaylist);
  }

  getUserProfile() {
    this.spotifyService.getUserProfile().subscribe(userProfile => this.userProfile = userProfile);
  }

  routeToPlaylist(playlistId: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: playlistId
      }
    };
    this.router.navigate(['spotify/playlist'], navigationExtras);
  }

  openCreatePlaylistDialog() {
    this.dialog.open(SpotifyCreatePlaylistComponent);
  }

  /**
   * // TODO: Create a header: artist name, image, followers
   * // TODO: Create a table for the top 10 tracks of an artist, allow the user to add those tracks to their own playlist, allow user to navigate to the artist as well
   * // TODO: Create a table for the albums: will be turned into a carousel in future sprints
   * // TODO: Styling
   */

}
