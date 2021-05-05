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
import {SpotifyPlaylistSnapshot} from "../model/spotify/SpotifyPlaylistSnapshot";
import {SpotifyArtist} from "../model/spotify/SpotifyArtist";

@Component({
  selector: 'app-spotify-search',
  templateUrl: './spotify-search.component.html',
  styleUrls: ['./spotify-search.component.css']
})
export class SpotifySearchComponent implements OnInit {

  spotifyUserPlaylist: SpotifyPlaylistSnapshot[];
  spotifyUser: SpotifyUser;
  isShown: boolean = true;

  trackSearchGroup: FormGroup;
  trackQueryResult: SpotifyTrack[];
  trackQuery: string;
  hideTrackSearchBar: boolean = false;

  artistSearchGroup: FormGroup;
  artistQueryResult: SpotifyArtist[];
  artistQuery: string;
  hideArtistSearchBar: boolean = false;
  searchFavourites: Boolean[] = null;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, public dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUserPlaylist();
    this.getUserProfile();
    this.trackSearchGroup = new FormGroup({
      'track_name': new FormControl(null, Validators.minLength(1))
    });
    this.artistSearchGroup = new FormGroup({
      'track_name': new FormControl(null, Validators.minLength(1))
    });
  }

  getUserProfile() {
    if (JSON.parse(sessionStorage.getItem("spotify_user"))) {
      this.spotifyUser = JSON.parse(sessionStorage.getItem("spotify_user"));
    } else {
      this.spotifyService.getUserProfile().subscribe(spotifyUser => {
        sessionStorage.setItem("spotify_user", JSON.stringify(spotifyUser));
        console.log(sessionStorage.getItem("spotify_user"));
        this.spotifyUser = spotifyUser;
      });
    }
  }

  getUserPlaylist() {
    if (JSON.parse(sessionStorage.getItem("spotify_user_playlists"))) {
      this.spotifyUserPlaylist = JSON.parse(sessionStorage.getItem("spotify_user_playlists"));
    } else {
      this.spotifyService.getUserPlaylist().subscribe(spotifyUserPlaylist => {
        sessionStorage.setItem("spotify_user_playlists", JSON.stringify(spotifyUserPlaylist));
        this.spotifyUserPlaylist = spotifyUserPlaylist;
      });
    }
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
        // this.processing = false;
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

  followTrack(track_id: string) {
    this.spotifyService.followTrack(track_id).subscribe();
    if (sessionStorage.getItem("spotify_user_favourite_tracks") != null) {
      this.spotifyService.getTrackById(track_id).subscribe(track => {
        sessionStorage.setItem('spotify_user_favourite_tracks', JSON.stringify([track].concat(JSON.parse(sessionStorage.getItem("spotify_user_favourite_tracks")))));
      });
    }
    this._snackBar.open('Song has been favourited!', '', {duration: 2000,});
  }

  unfollowTrack(track_id: string) {
    this.spotifyService.unfollowTrack(track_id).subscribe();
    if (sessionStorage.getItem("spotify_user_favourite_tracks") != null) {
      let favouriteTracks = JSON.parse(sessionStorage.getItem("spotify_user_favourite_tracks"));
      favouriteTracks.forEach((track, index) => {
        if (track.id == track_id) {
          favouriteTracks.splice(index, 1);
        }
      });
      sessionStorage.setItem('spotify_user_favourite_tracks', JSON.stringify(favouriteTracks));
    }
    this._snackBar.open('Song has been unfavourited!', '', {duration: 2000,});

  }

  async checkFollowedTrackByPromise(track_id: string[]) {
    return this.spotifyService.checkFollowedTrackByPromise(track_id);
  }

  async getFavouritedTracks(track_ids: string[]) {
    return this.spotifyService.checkFollowedTrack(track_ids).subscribe(result => console.log('favourited array', this.searchFavourites = result));
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
    this.spotifyService.getTrackQuery(track_name).subscribe(async resultingTrackList => await this.getFavouritedTracks((this.trackQueryResult = resultingTrackList).map(track => track.id)));
  }

  queryArtistByName(artist_name: string) {
    this.spotifyService.getArtistQuery(artist_name).subscribe(artistResult => this.artistQueryResult = artistResult);
  }

  clearSearchQuery() {
    this.trackQuery = "";
    this.artistQuery = "";
    this.trackQueryResult = null;
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

  routeToArtist(artist_id: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: artist_id
      }
    };
    this.router.navigate(['spotify/artist'], navigationExtras);
  }

}
