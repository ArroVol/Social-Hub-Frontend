import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
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


@Component({
  selector: 'app-spotify-playlist',
  templateUrl: './spotify-playlist.component.html',
  styleUrls: ['./spotify-playlist.component.css'],
})
export class SpotifyPlaylistComponent implements OnInit {

  @ViewChild(MatAccordion) artistAccordion: MatAccordion;
  private playlist_id: string;
  spotifyPlaylist: SpotifyPlaylist;
  spotifyUserPlaylist: SpotifyPlaylist[];
  spotifyTrackList: SpotifyTrack[];
  userProfile: SpotifyUser;


  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log(this.playlist_id = this.route.snapshot.queryParamMap.get('id'));
      this.getPlaylistById(this.playlist_id = this.route.snapshot.queryParamMap.get('id'));
      this.getUserPlaylist();
      this.getUserProfile();
    });

  }

  getPlaylistById(playlistId: string) {
    this.spotifyService.getPlaylistById(playlistId).subscribe(spotifyPlaylist => {
      this.spotifyPlaylist = spotifyPlaylist;
      this.spotifyTrackList = spotifyPlaylist.tracks;
      console.log(this.spotifyTrackList);
      console.log(this.spotifyTrackList[0].artistInfo);

    });
    console.log('in spotify playlist component ts called get playlist by id: ' + playlistId);
  }


  getUserPlaylist() {
    this.spotifyService.getUserPlaylist().subscribe(spotifyUserPlaylist => this.spotifyUserPlaylist = spotifyUserPlaylist);
  }

  getUserProfile() {
    this.spotifyService.getUserProfile().subscribe(userProfile => this.userProfile = userProfile);
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
    moveItemInArray(this.spotifyTrackList, event.previousIndex, event.currentIndex);
  }

  reorderPlaylist(playlist_id: string, range_start: number, insert_before: number) {
    this.spotifyService.reOrderPlaylist(playlist_id, range_start, insert_before).subscribe(result => {
      this.spotifyPlaylist = result;
      this.spotifyTrackList = result.tracks;
    });
  }

  deleteTrackFromPlaylist(trackPosition: number) {
    console.log(this.spotifyTrackList[trackPosition].spotifyUri);
    this.spotifyService.removeTrackFromPlaylist(this.spotifyPlaylist.id, this.spotifyTrackList[trackPosition].spotifyUri).subscribe(result => {
      this.spotifyPlaylist = result;
      this.spotifyTrackList = result.tracks;
      // console.log('Tracks: ', result.tracks);
      // console.log(result);
    });
    // this.routeToPlaylist(this.spotifyPlaylist.id);
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


// Create component for updating the playlist
  /**
   * // TODO: Research a way to take in a jpeg image and send it to the back-end as binary data, or modify the contract accordingly
   */


  routeToArtist(artistId: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: artistId
      }
    };
    this.router.navigate(['spotify/artist'], navigationExtras);
  }

  addToPlaylist(playlistId: string, track_uri: string) {
    console.log('playlistId', playlistId);
    console.log('track_uri', track_uri);
    this.spotifyService.addTrackToPlaylist(playlistId, track_uri).subscribe(result => {
      console.log(result);


    });
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
      if (playlist != null) {
        this.spotifyPlaylist = playlist;
      }
    });
  }
}
