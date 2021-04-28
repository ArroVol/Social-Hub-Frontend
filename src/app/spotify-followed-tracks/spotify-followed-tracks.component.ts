import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {SpotifyService} from "../service/spotify.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SpotifyPlaylist} from "../model/spotify/SpotifyPlaylist";
import {SpotifyUser} from "../model/spotify/SpotifyUser";
import {SpotifyAddplaylistSnackbarComponent} from "../spotify-addplaylist-snackbar/spotify-addplaylist-snackbar.component";
import {SpotifyTrack} from "../model/spotify/SpotifyTrack";
import {SpotifyAddplaylistWarningComponent} from "../spotify-addplaylist-warning/spotify-addplaylist-warning.component";
import {SpotifyCreatePlaylistComponent} from "../spotify-create-playlist/spotify-create-playlist.component";

@Component({
  selector: 'app-spotify-followed-tracks',
  templateUrl: './spotify-followed-tracks.component.html',
  styleUrls: ['./spotify-followed-tracks.component.css']
})

export class SpotifyFollowedTracksComponent implements OnInit {

  spotifyUserPlaylist: SpotifyPlaylist[];
  userProfile: SpotifyUser;
  isShown: boolean = true;
  spotifyTrackList: SpotifyTrack[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, public dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar, public lc: NgZone) {
  }

  ngOnInit(): void {
    this.getUserPlaylist();
    this.getUserProfile();
    this.initializeUserFavouriteTracks();
  }

  getUserPlaylist() {
    this.spotifyService.getUserPlaylist().subscribe(spotifyUserPlaylist => {
      this.spotifyUserPlaylist = spotifyUserPlaylist;
      this.hideloader();
    });
  }

  getUserProfile() {
    this.spotifyService.getUserProfile().subscribe(userProfile => this.userProfile = userProfile);
  }

  initializeUserFavouriteTracks() {
    this.spotifyService.getUserFollowedTracks().subscribe(trackList => this.spotifyTrackList = trackList);
  }

  transform(input: string) {
    let minutes: string | number = Math.floor((parseInt(input) / (1000 * 60)) % 60);
    let seconds: string | number = Math.floor((parseInt(input) / 1000) % 60);
    let formatted_minutes = (minutes < 10) ? '0' + minutes : minutes;
    let formatted_seconds = (seconds < 10) ? '0' + seconds : seconds;
    return formatted_minutes + ':' + formatted_seconds;
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

  routeToArtist(artistId: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: artistId
      }
    };
    this.router.navigate(['spotify/artist'], navigationExtras);
  }

  openCreatePlaylistDialog() {
    this.dialog.open(SpotifyCreatePlaylistComponent);
  }


  async addToPlaylist(playlistId: string, track_uri: string) {
    let playlist = await this.findPlaylistById(playlistId);
    let spotifyTrackList = playlist.tracks;
    let check = await this.checkMatchingTrackUri(spotifyTrackList, track_uri);
    if (check) {
      this.openAddWarning(playlistId, track_uri);
    } else {
      this.spotifyService.addTrackToPlaylist(playlistId, track_uri).subscribe(result => {
        this._snackBar.openFromComponent(SpotifyAddplaylistSnackbarComponent, {
          duration: 3000,
        });
      });
    }
  }

  async findPlaylistById(playlist_id: string): Promise<SpotifyPlaylist> {
    return this.spotifyService.getPlaylistByIdPromise(playlist_id);
  }

  async checkMatchingTrackUri(spotifyTrackList: SpotifyTrack[], track_uri: string) {

    for (let track of spotifyTrackList) {
      if (track.spotifyUri === track_uri) {
        return true;
      }
    }
    return false;
  }

  openAddWarning(playlistId: string, track_uri: string) {
    this.dialog.open(SpotifyAddplaylistWarningComponent, {data: {accept: false}}).afterClosed().subscribe(value => {
      if (value.accept != null && value.accept == true) {
        this.spotifyService.addTrackToPlaylist(playlistId, track_uri).subscribe(result => {
          this._snackBar.openFromComponent(SpotifyAddplaylistSnackbarComponent, {
            duration: 3000,
          });

        });
      }
    })
  }

  hideloader() {
    this.isShown = false;
  }

}
