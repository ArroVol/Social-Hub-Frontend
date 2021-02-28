import {Component, OnInit} from '@angular/core';
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


@Component({
  selector: 'app-spotify-playlist',
  templateUrl: './spotify-playlist.component.html',
  styleUrls: ['./spotify-playlist.component.css'],
})
export class SpotifyPlaylistComponent implements OnInit {

  private playlist_id: string;
  spotifyPlaylist: SpotifyPlaylist;
  spotifyUserPlaylist: SpotifyPlaylist[];
  spotifyTrackList: SpotifyTrack[];
  userProfile: SpotifyUser;
  // playlistExists = false;

  // validatingForm: FormGroup;

  // ELEMENT_DATA: SpotifyTrack[];
  // columnsToDisplay: ['album', 'name', 'artistNames', 'duration'];
  // // @ts-ignore
  // dataSource = new MatTableDataSource<SpotifyTrack>(this.ELEMENT_DATA);

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log(this.playlist_id = this.route.snapshot.queryParamMap.get('id'));
      this.getPlaylistById(this.playlist_id = this.route.snapshot.queryParamMap.get('id'));
      this.getUserPlaylist();
      this.getUserProfile();
    });
    // this.getPlaylistById(this.playlist_id);
    // this.getUserPlaylist();
    // this.validatingForm = new FormGroup({
    //   addPlaylistFormModalName: new FormControl('', Validators.required),
    //   addPlaylistFormModalDescription: new FormControl('', Validators.required)
    // });
  }

  getPlaylistById(playlistId: string) {
    this.spotifyService.getPlaylistById(playlistId).subscribe(spotifyPlaylist => {
      this.spotifyPlaylist = spotifyPlaylist;
      this.spotifyTrackList = spotifyPlaylist.tracks;
      console.log(this.spotifyTrackList);
      // this.dataSource.data = spotifyPlaylist.tracks as SpotifyTrack[];
      // if (spotifyPlaylist.tracks != null && spotifyPlaylist.tracks.length > 0) {
      //   this.playlistExists = true;
      // }
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
    moveItemInArray(this.spotifyTrackList, event.previousIndex, event.currentIndex);
    this.reorderPlaylist(this.spotifyPlaylist.id, event.previousIndex, event.currentIndex);
  }

  reorderPlaylist(playlist_id: string, range_start: number, insert_before: number) {
    this.spotifyService.reOrderPlaylist(playlist_id, range_start, insert_before).subscribe(result => this.spotifyPlaylist = result);
  }

  deleteTrackFromPlaylist(trackPosition: number) {
    console.log(this.spotifyTrackList[trackPosition].spotifyUri);
    this.spotifyService.removeTrackFromPlaylist(this.spotifyPlaylist.id, this.spotifyTrackList[trackPosition].spotifyUri).subscribe(result => this.spotifyPlaylist = result);
    this.routeToPlaylist(this.spotifyPlaylist.id);
  }

  transform(input: string) {
    let minutes: string | number = Math.floor((parseInt(input) / (1000 * 60)) % 60);
    let seconds: string | number = Math.floor((parseInt(input) / 1000) % 60);
    let formatted_minutes = (minutes < 10) ? '0' + minutes : minutes;
    let formatted_seconds = (seconds < 10) ? '0' + seconds : seconds;
    return formatted_minutes + ':' + formatted_seconds;
  }

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

  openDialog() {
    this.dialog.open(SpotifyCreatePlaylistComponent);
  }
}
