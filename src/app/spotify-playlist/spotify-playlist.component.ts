import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {SpotifyService} from '../service/spotify.service';
import {switchMap} from 'rxjs/operators';
import {SpotifyPlaylist} from '../model/spotify/SpotifyPlaylist';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SpotifyTrack} from '../model/spotify/SpotifyTrack';

@Component({
  selector: 'app-spotify-playlist',
  templateUrl: './spotify-playlist.component.html',
  styleUrls: ['./spotify-playlist.component.css'],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({height: '0px', minHeight: '0'})),
  //     state('expanded', style({height: '*'})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ]
})
export class SpotifyPlaylistComponent implements OnInit {

  private readonly playlist_id: string;
  spotifyPlaylist: SpotifyPlaylist;
  spotifyUserPlaylist: SpotifyPlaylist[];
  spotifyTrackList: SpotifyTrack[];

  columnsToDisplay: ["Title", "Artists", "Duration"];
  expandedElement: SpotifyTrack | null;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {
    console.log(this.playlist_id = this.route.snapshot.queryParamMap.get('id'));
  }

  ngOnInit(): void {
    this.getPlaylistById(this.playlist_id);
    this.getUserPlaylist();
  }

  getPlaylistById(playlistId: string) {
    this.spotifyService.getPlaylistById(playlistId).subscribe(spotifyPlaylist => {
      this.spotifyPlaylist = spotifyPlaylist;
      this.spotifyTrackList = spotifyPlaylist.tracks;
    });
    console.log('in spotify playlist component ts called get playlist by id: ' + playlistId);
  }

  getUserPlaylist() {
    this.spotifyService.getUserPlaylist().subscribe(spotifyUserPlaylist => this.spotifyUserPlaylist = spotifyUserPlaylist);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.spotifyTrackList, event.previousIndex, event.currentIndex);
  }


}
