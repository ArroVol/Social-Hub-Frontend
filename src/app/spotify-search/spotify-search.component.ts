import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {SpotifyService} from "../service/spotify.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SpotifyPlaylist} from "../model/spotify/SpotifyPlaylist";
import {SpotifyTrack} from "../model/spotify/SpotifyTrack";
import {SpotifyUser} from "../model/spotify/SpotifyUser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SpotifyCreatePlaylistComponent} from "../spotify-create-playlist/spotify-create-playlist.component";
import {SpotifyAddplaylistSnackbarComponent} from "../spotify-addplaylist-snackbar/spotify-addplaylist-snackbar.component";
import {SpotifyAddplaylistWarningComponent} from "../spotify-addplaylist-warning/spotify-addplaylist-warning.component";

@Component({
  selector: 'app-spotify-search',
  templateUrl: './spotify-search.component.html',
  styleUrls: ['./spotify-search.component.css']
})
export class SpotifySearchComponent implements OnInit {

  spotifyUserPlaylist: SpotifyPlaylist[];
  userProfile: SpotifyUser;
  isShown: boolean = true;

  trackSearchGroup: FormGroup;
  trackQueryResult: SpotifyTrack[];
  trackQuery: string;
  hideTrackSearchBar: boolean = false;

  artistQuery: string;
  hideArtistSearchBar: boolean = false;


  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, public dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUserPlaylist();
    this.getUserProfile();
    this.trackSearchGroup = new FormGroup({
      'track_name': new FormControl(null, Validators.minLength(1))
    });
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

  queryTrackByName(track_name: string) {
    //
    // this.timeout = window.setTimeout(() => {
    //   this.timeout = null;
    //   this.lc.run(() => this.spotifyService.getTrackQuery(track_name).subscribe(resultingTrackList => this.trackQueryResult = resultingTrackList));
    // },1000);

    this.spotifyService.getTrackQuery(track_name).subscribe(resultingTrackList => this.trackQueryResult = resultingTrackList);
  }

  clearSearchQuery() {
    this.trackQuery = "";
    this.artistQuery = "";
    this.trackQueryResult = null;

  }

  hideloader() {
    this.isShown = false;
  }

  openDialog() {
    this.dialog.open(SpotifyCreatePlaylistComponent);
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

}
