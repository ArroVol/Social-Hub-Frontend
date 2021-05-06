import {Component, OnInit} from '@angular/core';
import {SpotifyUser} from '../model/spotify/SpotifyUser';
import {SpotifyPlaylist} from '../model/spotify/SpotifyPlaylist';
import {SpotifyService} from '../service/spotify.service';
import {NavigationExtras, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SpotifyCreatePlaylistComponent} from '../spotify-create-playlist/spotify-create-playlist.component';
import {SpotifyTrack} from '../model/spotify/SpotifyTrack';
import {SpotifyArtist} from '../model/spotify/SpotifyArtist';
import {SpotifyAlbum} from '../model/spotify/SpotifyAlbum';
import {SpotifyAddplaylistSnackbarComponent} from '../spotify-addplaylist-snackbar/spotify-addplaylist-snackbar.component';
import {SpotifyAddplaylistWarningComponent} from '../spotify-addplaylist-warning/spotify-addplaylist-warning.component';

@Component({
  selector: 'app-spotify-favourites',
  templateUrl: './spotify-favourites.component.html',
  styleUrls: ['./spotify-favourites.component.css']
})
export class SpotifyFavouritesComponent implements OnInit {
  isShown = true;

  spotifyUser: SpotifyUser;
  spotifyUserPlaylist: SpotifyPlaylist[];

  favouriteTracks: SpotifyTrack[];
  favouriteArtists: SpotifyArtist[];
  favouriteAlbums: SpotifyAlbum[];

  showAllTracks = false;
  showAllArtists = false;
  showAllAlbums = false;

  constructor(private spotifyService: SpotifyService, private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.getUserPlaylist();
    this.getUserFavouriteTracks();
    this.getUserFavouriteAlbums();
    this.getUserFavouriteArtists();
  }

  getUserProfile() {
    if (sessionStorage.getItem('spotify_user') != null) {
      this.spotifyUser = JSON.parse(sessionStorage.getItem('spotify_user'));
    } else {
      this.spotifyService.getUserProfile().subscribe(spotifyUser => {
        sessionStorage.setItem('spotify_user', JSON.stringify(spotifyUser));
        this.spotifyUser = spotifyUser;
      });
    }
  }

  getUserPlaylist() {
    this.spotifyService.getUserPlaylist().subscribe(spotifyUserPlaylist => {
      this.spotifyUserPlaylist = spotifyUserPlaylist;
      this.hideloader();
    });
  }

  getUserFavouriteTracks() {
    if (sessionStorage.getItem('spotify_user_favourite_tracks') != null) {
      this.favouriteTracks = JSON.parse(sessionStorage.getItem('spotify_user_favourite_tracks'));
    } else {
      this.spotifyService.getUserFollowedTracks().subscribe(tracks => {
        sessionStorage.setItem('spotify_user_favourite_tracks', JSON.stringify(tracks));
        this.favouriteTracks = tracks;

      });
    }

    // this.spotifyService.getUserFollowedTracks().subscribe(tracks => this.favouriteTracks = tracks);
  }

  getUserFavouriteArtists() {
    if (sessionStorage.getItem('spotify_user_favourite_artists') != null) {
      this.favouriteArtists = JSON.parse(sessionStorage.getItem('spotify_user_favourite_artists'));
    } else {
      this.spotifyService.getUserFollowedArtists().subscribe(artists => {
        sessionStorage.setItem('spotify_user_favourite_artists', JSON.stringify(artists));
        this.favouriteArtists = artists;

      });
    }
    // this.spotifyService.getUserFollowedArtists().subscribe(artists => this.favouriteArtists = artists);
  }

  getUserFavouriteAlbums() {
    if (sessionStorage.getItem('spotify_user_favourite_albums') != null) {
      this.favouriteAlbums = JSON.parse(sessionStorage.getItem('spotify_user_favourite_albums'));
    } else {
      this.spotifyService.getUserFollowedAlbums().subscribe(albums => {
        sessionStorage.setItem('spotify_user_favourite_albums', JSON.stringify(albums));
        this.favouriteAlbums = albums;

      });
    }
    // this.spotifyService.getUserFollowedAlbums().subscribe(albums => this.favouriteAlbums = albums);
  }

  unfollowTrack(id: string) {
    this.spotifyService.unfollowTrack(id).subscribe();
    this.removeFromSavedTracks(id);
    this._snackBar.open('Song has been unfavourited!', '', {duration: 2000, });
  }

  removeFromSavedTracks(id: string) {
    this.favouriteTracks.forEach((track, index) => {
      if (track.id == id) {
        this.favouriteTracks.splice(index, 1);
      }
    });
    sessionStorage.setItem('spotify_user_favourite_tracks', JSON.stringify(this.favouriteTracks));
  }

  unfollowArtist(id: string) {
    this.spotifyService.unfollowArtist(id).subscribe();
    this.removeFromSavedArtists(id);
    this._snackBar.open('Artist has been unfavourited!', '', {duration: 2000, });
  }

  removeFromSavedArtists(id: string) {
    this.favouriteArtists.forEach((artist, index) => {
      if (artist.id == id) {
        this.favouriteTracks.splice(index, 1);
      }
    });
    sessionStorage.setItem('spotify_user_favourite_artists', JSON.stringify(this.favouriteArtists));
  }


  routeToPlaylist(playlistId: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: playlistId
      }
    };
    this.router.navigate(['spotify/playlist'], navigationExtras);
  }

  routeToArtist(artist_id: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: artist_id
      }
    };
    this.router.navigate(['spotify/artist'], navigationExtras);
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
    });
  }


}
