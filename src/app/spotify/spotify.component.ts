import {Component, OnInit} from '@angular/core';
import {SpotifyUser} from '../model/spotify/SpotifyUser';
import {SpotifyService} from '../service/spotify.service';
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

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  spotifyUser: SpotifyUser;
  spotifyUserPlaylist: SpotifyPlaylistSnapshot[];

  newRealeaseAlbums: SpotifyAlbum[];
  featuredPlaylists: SpotifyPlaylistSnapshot[];
  userTopTracks: SpotifyTrack[];
  userRecentTracks: SpotifyTrack[];

  userFavouriteTracks: Map<string, Boolean> = new Map<string, Boolean>();

  showAllFeaturedPlaylists: boolean = false;
  showAllNewReleaseAlbums: boolean = false;

  constructor(private spotifyService: SpotifyService, private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.getUserPlaylist();
    this.getNewReleases();
    this.getFeaturedPlaylists();
    this.setUserTopTracksAndRecentTracks();
    // this.getUserTopTracks();
    // this.getUserRecentTracks();
  }


  getUserProfile() {
    if (JSON.parse(sessionStorage.getItem("spotify_user"))) {
      this.spotifyUser = JSON.parse(sessionStorage.getItem("spotify_user"));
    } else {
      this.spotifyService.getUserProfile().subscribe(spotifyUser => {
        sessionStorage.setItem("spotify_user", JSON.stringify(spotifyUser));
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

  async getFavouritedTracks(track_ids: string[]) {
    console.log('get favourited tracks', track_ids);
    let trackSet = new Set(track_ids);
    let index = 0;
    this.spotifyService.checkFollowedTrack(Array.from(trackSet)).subscribe(value => {
      trackSet.forEach(track_id => this.userFavouriteTracks.set(track_id, value[index++]));
    });
  }

  // async getFavouritedTopTracks(track_ids: string[]) {
  //   this.userTopTracksFavourites = await this.spotifyService.checkFollowedTrackByPromise(track_ids);
  //   // console.log('favourited array', this.artistTopTracksFavourites);
  // }
  //
  // async getFavouritedRecentTracks(track_ids: string[]) {
  //   this.userRecentTracksFavourites = await this.spotifyService.checkFollowedTrackByPromise(track_ids);
  //   // console.log('favourited array', this.artistTopTracksFavourites);
  // }

  followTrack(track_id: string) {
    this.spotifyService.followTrack(track_id).subscribe();
    this.userFavouriteTracks.set(track_id, true);
    console.log('favouritesMap', this.userFavouriteTracks);
    if (sessionStorage.getItem("spotify_user_favourite_tracks") != null) {
      this.spotifyService.getTrackById(track_id).subscribe(track => {
        sessionStorage.setItem('spotify_user_favourite_tracks', JSON.stringify([track].concat(JSON.parse(sessionStorage.getItem("spotify_user_favourite_tracks")))));
      });

    }
    this._snackBar.open('Song has been favourited!', '', {duration: 2000,});
  }

  unfollowTrack(track_id: string) {
    this.spotifyService.unfollowTrack(track_id).subscribe();
    this.userFavouriteTracks.set(track_id, false);
    console.log('favouritesMap', this.userFavouriteTracks);
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

  getNewReleases() {
    if (JSON.parse(sessionStorage.getItem("spotify_featured_albums"))) {
      console.log('featued albums session storage!', JSON.parse(sessionStorage.getItem("spotify_featured_albums")));
      this.newRealeaseAlbums = JSON.parse(sessionStorage.getItem("spotify_featured_albums"));

    } else {
      console.log("new releases not in session storage!");
      this.spotifyService.getNewReleases().subscribe(albums => {
        console.log('service call featured albums', albums);
        sessionStorage.setItem('spotify_featured_albums', JSON.stringify(albums));
        console.log('featued albums session storage!', JSON.parse(sessionStorage.getItem("spotify_featured_albums")));
        this.newRealeaseAlbums = albums;
      });
    }
  }

  getFeaturedPlaylists() {
    if (JSON.parse(sessionStorage.getItem("spotify_featured_playlist"))) {
      console.log('featued playlists session storage!', JSON.parse(sessionStorage.getItem("spotify_featured_playlist")));
      this.featuredPlaylists = JSON.parse(sessionStorage.getItem("spotify_featured_playlist"));
    } else {
      this.spotifyService.getFeaturedPlaylists().subscribe(playlists => {
        console.log('service call featured playlists', playlists);
        sessionStorage.setItem('spotify_featured_playlist', JSON.stringify(playlists));
        console.log('featued playlist session storage!', JSON.parse(sessionStorage.getItem("spotify_featured_playlist")));
        this.featuredPlaylists = playlists;
      });
    }
  }

  // TODO: refactor once errythin is workin by making the methods async

  async setUserTopTracksAndRecentTracks() {
    // do all the method calls
    await this.getUserTopTracks();
    await this.getUserRecentTracks();
    console.log('favouritesMap', this.userFavouriteTracks);
    // await this.getFavouritedTracks(this.userTopTracks.map(track => track.id).concat(this.userRecentTracks.map(track => track.id)));
  }

  async getUserTopTracks() {
    if (JSON.parse(sessionStorage.getItem("spotify_user_tracks_top"))) {
      console.log('spotify_user_tracks_top session storage!', JSON.parse(sessionStorage.getItem("spotify_user_tracks_top")));
      this.userTopTracks = JSON.parse(sessionStorage.getItem("spotify_user_tracks_top"));
      // await this.getFavouritedTopTracks(JSON.parse(sessionStorage.getItem("spotify_user_tracks_top")).map(track => track?.id));
      await this.getFavouritedTracks(JSON.parse(sessionStorage.getItem("spotify_user_tracks_top")).map(track => track?.id));
    } else {
      this.spotifyService.getUserTopTracks().subscribe(async topTracks => {
        console.log('service call top tracks', topTracks);
        sessionStorage.setItem('spotify_user_tracks_top', JSON.stringify(topTracks));
        console.log('spotify_user_tracks_top session storage!', JSON.parse(sessionStorage.getItem("spotify_user_tracks_top")));
        this.userTopTracks = topTracks;
        // await this.getFavouritedTopTracks(topTracks.map(track => track?.id));
        await this.getFavouritedTracks(topTracks.map(track => track?.id));
      });
    }
  }

  async getUserRecentTracks() {
    if (JSON.parse(sessionStorage.getItem("spotify_user_tracks_recent"))) {
      console.log('spotify_user_tracks_recent session storage!', JSON.parse(sessionStorage.getItem("spotify_user_tracks_recent")));
      this.userRecentTracks = JSON.parse(sessionStorage.getItem("spotify_user_tracks_recent"));
      // await this.getFavouritedRecentTracks(JSON.parse(sessionStorage.getItem("spotify_user_tracks_recent")).map(track => track?.id));
      await this.getFavouritedTracks(JSON.parse(sessionStorage.getItem("spotify_user_tracks_recent")).map(track => track?.id));

    } else {
      this.spotifyService.getUserRecentTracks().subscribe(async recentTracks => {
        console.log('service call recent tracks', recentTracks);
        sessionStorage.setItem('spotify_user_tracks_recent', JSON.stringify(recentTracks));
        console.log('spotify_user_tracks_recent session storage!', JSON.parse(sessionStorage.getItem("spotify_user_tracks_recent")));
        this.userRecentTracks = recentTracks;
        // await this.getFavouritedRecentTracks(recentTracks.map(track => track?.id));
        await this.getFavouritedTracks(recentTracks.map(track => track?.id));
      });
    }
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


  transform(input: string) {
    let minutes: string | number = Math.floor((parseInt(input) / (1000 * 60)) % 60);
    let seconds: string | number = Math.floor((parseInt(input) / 1000) % 60);
    let formatted_minutes = (minutes < 10) ? '0' + minutes : minutes;
    let formatted_seconds = (seconds < 10) ? '0' + seconds : seconds;
    return formatted_minutes + ':' + formatted_seconds;
  }
}
