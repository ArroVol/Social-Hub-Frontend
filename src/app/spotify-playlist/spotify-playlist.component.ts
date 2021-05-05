import {Component, Injectable, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {SpotifyService} from '../service/spotify.service';
import {switchMap} from 'rxjs/operators';
import {SpotifyPlaylist} from '../model/spotify/SpotifyPlaylist';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SpotifyTrack} from '../model/spotify/SpotifyTrack';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {SpotifyCreatePlaylistComponent} from '../spotify-create-playlist/spotify-create-playlist.component';
import {SpotifyUser} from '../model/spotify/SpotifyUser';
import {MatAccordion} from '@angular/material/expansion';
import {SpotifyUpdatePlaylistComponent} from "../spotify-update-playlist/spotify-update-playlist.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SpotifyAddplaylistSnackbarComponent} from "../spotify-addplaylist-snackbar/spotify-addplaylist-snackbar.component";
import {SpotifyAddplaylistWarningComponent} from "../spotify-addplaylist-warning/spotify-addplaylist-warning.component";
import {Observable} from "rxjs";
import {SpotifyPlaylistSnapshot} from "../model/spotify/SpotifyPlaylistSnapshot";


@Component({
  selector: 'app-spotify-playlist',
  templateUrl: './spotify-playlist.component.html',
  styleUrls: ['./spotify-playlist.component.css'],
})
export class SpotifyPlaylistComponent implements OnInit {

  @ViewChild(MatAccordion) artistAccordion: MatAccordion;

  private playlist_id: string;
  spotifyPlaylist: SpotifyPlaylist = null;
  recommendedTracks: SpotifyTrack[] = null;
  spotifyUserPlaylist: SpotifyPlaylistSnapshot[];
  spotifyUser: SpotifyUser;
  isShown: boolean = true;
  tracksShowAll: boolean = false;

  trackFavouritesMap: Map<string, Boolean> = new Map();
  recommendedTracksMap: Map<string, Boolean> = new Map();
  currentSpotifyPlaylist: Observable<SpotifyPlaylist>;

  spotifyPlaylistOwner: Observable<SpotifyUser>;



  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, public dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar, public lc: NgZone) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log(this.playlist_id = this.route.snapshot.queryParamMap.get('id'));
      this.getPlaylistById(this.playlist_id = this.route.snapshot.queryParamMap.get('id'));
      this.getUserPlaylist();
      this.getUserProfile();
    });

  }

  async getPlaylistById(playlistId: string) {
    this.currentSpotifyPlaylist = this.spotifyService.getPlaylistById(playlistId);
    this.spotifyPlaylist = await this.spotifyService.getPlaylistByIdPromise(playlistId);
    await this.setRecommendedTracks();
    await this.getPlaylistTrackFavourites();
    this.spotifyPlaylistOwner = this.spotifyService.getUserById(this.spotifyPlaylist.ownerId);
    console.log('the current favourites map', this.trackFavouritesMap);
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

  getUserProfile() {
    if (sessionStorage.getItem("spotify_user") != null) {
      this.spotifyUser = JSON.parse(sessionStorage.getItem("spotify_user"));
    } else {
      this.spotifyService.getUserProfile().subscribe(spotifyUser => {
        sessionStorage.setItem("spotify_user", JSON.stringify(spotifyUser));
        this.spotifyUser = spotifyUser;
      });
    }
  }

  //
  // testFavourites(track_id: string) {
  //   let tracks = JSON.parse(sessionStorage.getItem('spotify_user_favourite_tracks'));
  //   console.log([tracks].find(track => track.id === track_id));
  //   return [tracks].find(track => track.id === track_id);
  // }

  async setRecommendedTracks() {
    this.recommendedTracks = await this.getRecommendedTracks();
    if (this.recommendedTracks != null) {
      await this.getRecommendedTrackFavourites(this.recommendedTracks.map(track => track?.id));
    }
  }

  async getRecommendedTracks() {
    let tracks = this.spotifyPlaylist?.tracks;
    if (tracks.length > 0 && tracks.length < 6) {
      return await this.spotifyService.getRecommendedTracksPromise(tracks.map(track => track.id).join(','));
    } else if (tracks.length > 6) {
      return await this.spotifyService.getRecommendedTracksPromise(tracks.slice(0, 5).map(track => track.id).join(','));
      // console.log('recommended tracks list', tracks.slice(0, 5).map(track => track.id).join(','));
    }
    return null;
    // this.spotifyService.getRecommendedTracks(track_ids).subscribe(tracks => this.recommendedTracks = tracks);
  }



  async getRecommendedTrackFavourites(track_ids: string[]) {
    let trackSet = new Set(track_ids);
    let index = 0;
    this.recommendedTracksMap.clear();
    this.spotifyService.checkFollowedTrack(Array.from(trackSet)).subscribe(value => {
      trackSet.forEach(track_id => this.recommendedTracksMap.set(track_id, value[index++]));
    });
    // this.spotifyService.checkFollowedTrack(track_ids).subscribe(result => this.recommendedTracksFavourites = result);
  }

  async getPlaylistTrackFavourites() {
    let trackSet = await new Set(await this.spotifyPlaylist.tracks.map(track => track.id));
    let index = 0;
    await this.spotifyService.checkFollowedTrack(Array.from(trackSet)).subscribe(value => {
      for (const track_id of trackSet) {
        this.trackFavouritesMap.set(track_id, value[index++]);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex < event.currentIndex) {
      this.reorderPlaylist(this.spotifyPlaylist.id, event.previousIndex, event.currentIndex + 1);
    } else {
      this.reorderPlaylist(this.spotifyPlaylist.id, event.previousIndex, event.currentIndex);
    }
    // console.log('previousIndex', event.previousIndex);
    // console.log('currentIndex', event.currentIndex);
    // this.reorderPlaylist(this.spotifyPlaylist.id, event.previousIndex, event.currentIndex);
    moveItemInArray(this.spotifyPlaylist.tracks, event.previousIndex, event.currentIndex);
  }

  reorderPlaylist(playlist_id: string, range_start: number, insert_before: number) {
    this.spotifyService.reOrderPlaylist(playlist_id, range_start, insert_before).subscribe(result => {
      this.spotifyPlaylist = result;
    });
  }

  deleteTrackFromPlaylist(trackPosition: number) {
    console.log(this.spotifyPlaylist.tracks[trackPosition].spotifyUri);
    this.spotifyService.removeTrackFromPlaylist(this.spotifyPlaylist.id, this.spotifyPlaylist.tracks[trackPosition].spotifyUri).subscribe(result => {
      this.spotifyPlaylist.tracks = result;
      this._snackBar.open('Song has been removed!', '', {duration: 2000,});
    });
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

  transform(input: string) {
    let minutes: string | number = Math.floor((parseInt(input) / (1000 * 60)) % 60);
    let seconds: string | number = Math.floor((parseInt(input) / 1000) % 60);
    let formatted_minutes = (minutes < 10) ? '0' + minutes : minutes;
    let formatted_seconds = (seconds < 10) ? '0' + seconds : seconds;
    return formatted_minutes + ':' + formatted_seconds;
  }


  // change this up a bit
  deletePlaylist() {
    window.location.href = 'http://localhost:8080/spotify/playlist/remove/playlist/' + this.spotifyPlaylist.id;
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

  updatePlaylist(playlistId: string, playlistName: string, playlistDescription: string) {
    this.spotifyService.updatePlaylistDetails(playlistId, playlistName, playlistDescription).subscribe((playlist) => {
      this.spotifyPlaylist = playlist;
    });

  }

  addToPlaylist(playlistId: string, track_uri: string) {
    // need the check here!
    if (playlistId === this.spotifyPlaylist.id) {
      if (this.checkMatchingTrackUri(track_uri)) {
        this.openAddWarning(playlistId, track_uri);
      } else {
        this.spotifyService.addTrackToPlaylist(playlistId, track_uri).subscribe(result => {
          this.spotifyPlaylist.tracks = result;
          this.spotifyService.checkFollowedTrack([track_uri]).subscribe(check => this.trackFavouritesMap.set(track_uri, check[0]));
          this._snackBar.openFromComponent(SpotifyAddplaylistSnackbarComponent, {
            duration: 3000,
          });

        });
      }
    } else {
      this.spotifyService.addTrackToPlaylist(playlistId, track_uri).subscribe(result => {
        this.spotifyService.checkFollowedTrack([track_uri]).subscribe(check => this.trackFavouritesMap.set(track_uri, check[0]));
        this._snackBar.openFromComponent(SpotifyAddplaylistSnackbarComponent, {
          duration: 3000,
        });

      });
    }

  }

  checkMatchingTrackUri(track_uri: string): boolean {
    for (let track of this.spotifyPlaylist.tracks) {
      if (track.spotifyUri === track_uri) {
        return true;
      }
    }
    return false;
  }

  openDialog() {
    this.dialog.open(SpotifyCreatePlaylistComponent);
  }

  openUpdateDialog() {
    this.dialog.open(SpotifyUpdatePlaylistComponent, {
      data: {
        id: this.spotifyPlaylist.id,
        name: this.spotifyPlaylist.name,
        description: this.spotifyPlaylist.description
      }
    })
      .afterClosed().subscribe(playlist => {
      console.log('return from update dialigue', playlist);
      if (playlist) {
        this.updatePlaylist(playlist.id, playlist.name, playlist.description);
      } else {
      }
    });
  }

  openAddWarning(playlistId: string, track_uri: string) {
    this.dialog.open(SpotifyAddplaylistWarningComponent, {data: {accept: false}}).afterClosed().subscribe(value => {
      if (value.accept != null && value.accept == true) {
        this.spotifyService.addTrackToPlaylist(playlistId, track_uri).subscribe(result => {
          this.spotifyPlaylist.tracks = result;
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

