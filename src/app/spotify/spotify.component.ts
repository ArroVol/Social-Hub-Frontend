import {Component, OnInit} from '@angular/core';
import {SpotifyUser} from '../model/spotify/SpotifyUser';
import {SpotifyService} from '../service/spotify.service';
import {SpotifyArtist} from '../model/spotify/SpotifyArtist';
import {SpotifyTrack} from '../model/spotify/SpotifyTrack';
import {SpotifyPlaylist} from '../model/spotify/SpotifyPlaylist';
import {Router, NavigationExtras} from '@angular/router';
import {SpotifyCreatePlaylistComponent} from '../spotify-create-playlist/spotify-create-playlist.component';
import {MatDialog} from '@angular/material/dialog';
import {SpotifyAlbum} from "../model/spotify/SpotifyAlbum";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SpotifyAddplaylistSnackbarComponent} from "../spotify-addplaylist-snackbar/spotify-addplaylist-snackbar.component";
import {SpotifyAddplaylistWarningComponent} from "../spotify-addplaylist-warning/spotify-addplaylist-warning.component";
import {SpotifyPlaylistSnapshot} from "../model/spotify/SpotifyPlaylistSnapshot";
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  isShown: boolean = true;

  spotifyUser: SpotifyUser;
  spotifyUserPlaylist: SpotifyPlaylist[];

  newRealeaseAlbums: SpotifyAlbum[];
  featuredPlaylists: SpotifyPlaylistSnapshot[];
  userTopTracks: SpotifyTrack[];
  userTopTracksFavourites: Boolean[];
  userRecentTracks: SpotifyTrack[];
  userRecentTracksFavourites: Boolean[];


  constructor(private spotifyService: SpotifyService, private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.getUserPlaylist();
    this.getNewReleases();
    this.getFeaturedPlaylists();
    this.getUserTopTracks();
    this.getUserRecentTracks();
  }

  getUserProfile() {
    this.spotifyService.getUserProfile().subscribe(spotifyUser => {
      this.spotifyUser = spotifyUser;
    });
    console.log('Get User Profile Called!');
  }

  getUserPlaylist() {
    this.spotifyService.getUserPlaylist().subscribe(spotifyUserPlaylist => {
      this.spotifyUserPlaylist = spotifyUserPlaylist;
      this.hideloader();
    });
  }

  getFavouritedTopTracks(track_ids: string[]) {
    return this.spotifyService.checkFollowedTrack(track_ids).subscribe(result => console.log('favourited top tracks array', this.userTopTracksFavourites = result));
    // console.log('favourited array', this.artistTopTracksFavourites);
  }

  getFavouritedRecentTracks(track_ids: string[]) {
    return this.spotifyService.checkFollowedTrack(track_ids).subscribe(result => console.log('favourited recent tracks array', this.userRecentTracksFavourites = result));
    // console.log('favourited array', this.artistTopTracksFavourites);
  }

  followTrack(track_id: string) {
    this.spotifyService.followTrack(track_id).subscribe();
    this._snackBar.open('Song has been favourited!', '', {duration: 2000,});
  }

  unfollowTrack(track_id: string) {
    this.spotifyService.unfollowTrack(track_id).subscribe();
    this._snackBar.open('Song has been unfavourited!', '', {duration: 2000,});

  }

  getNewReleases() {
    this.spotifyService.getNewReleases().subscribe(albums => this.newRealeaseAlbums = albums);
  }

  getFeaturedPlaylists() {
    this.spotifyService.getFeaturedPlaylists().subscribe(playlists => this.featuredPlaylists = playlists);
  }

  getUserTopTracks() {
    this.spotifyService.getUserTopTracks().subscribe(topTracks => {
      this.userTopTracks = topTracks;
      this.getFavouritedTopTracks(topTracks.map(track => track.id));
    });
  }

  getUserRecentTracks() {
    this.spotifyService.getUserRecentTracks().subscribe(recentTracks => {
      this.userRecentTracks = recentTracks;
      this.getFavouritedRecentTracks(recentTracks.map(track => track.id));
    });
  }

  routeToPlaylist(playlistId: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: playlistId
      }
    };
    this.router.navigate(['spotify/playlist'], navigationExtras);
  }

  routeToArtist(artist_id: string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: artist_id
      }
    };
    this.router.navigate(['spotify/artist'], navigationExtras);
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


  openDialog() {
    this.dialog.open(SpotifyCreatePlaylistComponent);

  }

  hideloader() {
    this.isShown = false;
  }

  transform(input: string) {
    let minutes: string | number = Math.floor((parseInt(input) / (1000 * 60)) % 60);
    let seconds: string | number = Math.floor((parseInt(input) / 1000) % 60);
    let formatted_minutes = (minutes < 10) ? '0' + minutes : minutes;
    let formatted_seconds = (seconds < 10) ? '0' + seconds : seconds;
    return formatted_minutes + ':' + formatted_seconds;
  }
}
