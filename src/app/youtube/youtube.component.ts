import {Component, OnInit, Pipe} from '@angular/core';
import { YoutubeService } from "../service/youtube.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
export interface Tile {
  cols: number;
  rows: number;
  videoArr: String[];
}

@Component({
  selector: 'app-facebook',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  profilePic: String;
  channelId: String;
  videoArr : String[];
  playlistArr: String[];
  likedArr: String[];
  tiles: Tile[];
  username: String;
  constructor(private youtubeService: YoutubeService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  getChannelId() {
    this.youtubeService.getChannelId()
      .subscribe(channelId => {
        this.channelId = channelId;
      });
    console.log(this.channelId);
  }
  getVideo(): String[] {
    this.youtubeService.getVideos()
      .subscribe(videoArr => {
        this.videoArr = videoArr;
      })
    console.log(this.videoArr);
    return this.videoArr;
  }

  getPlaylists() {
    this.youtubeService.getPlaylists()
      .subscribe(playlistArr => {
        this.playlistArr = playlistArr;
      })
    console.log(this.videoArr);
  }

  getLikedVideos() {
    this.youtubeService.getLikedVideos()
      .subscribe(likedArr => {
        this.likedArr = likedArr;
      })
  }

  getProfilePicture() {
    this.youtubeService.getProfilePicture()
      .subscribe(profilePic => {
        this.profilePic = profilePic;
      })
  }

  getUsername() {
    this.youtubeService.getUsername()
      .subscribe(username => {
        this.username = username;
      })
  }

  getElements() {
    this.getVideo();
    this.getChannelId();
    this.getPlaylists();
    this.getLikedVideos();
    this.getProfilePicture();
    this.getUsername()
  }

  createTileArray() {

  }

}
