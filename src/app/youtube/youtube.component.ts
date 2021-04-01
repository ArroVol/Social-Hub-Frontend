import {Component, OnInit, Output, Pipe} from '@angular/core';
import { YoutubeService } from '../service/youtube.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {Video} from '../model/youtube/Video';
import {Channel} from '../model/youtube/Channel';
import {UserService} from '../service/user.service';
import {User} from '../model/user/User';
import {Observable} from 'rxjs';
import {Youtube} from '../model/youtube/Youtube';
export interface Tile {
  cols: number;
  rows: number;
  videoArr: String[];
}

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  pullTime: String;
  channel: Channel;
  isVisible = false;
  isVisibleSpinner = false;
  isLoggedIn = true;
  user: Youtube;
  constructor(private youtubeService: YoutubeService, private userService: UserService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // console.log(sessionStorage.getItem('username'));
    // if (this.youtubeService.getUserByUsername(sessionStorage.getItem('username')) != null) {
    //   console.log(this.youtubeService.getUserByUsername(sessionStorage.getItem('username')));
    //   this.isVisible = true;
    //   this.getChannelInfo();
    //   this.getLastPulled();
    // }
  }

  // getYoutubeInfo() {
  //   let un: string = sessionStorage.getItem('username');
  //   this.userService.getUserByUsername(un).subscribe(user => {
  //     let userId: number = user.userId;
  //     // this.youtubeService.getUserById(userId);
  //   });


  // }
  getChannelInfo(): Channel {
      this.isLoggedIn = false;
      console.log('in channel info');
      let channelTemp: Channel;
      this.youtubeService.getChannelInfo()
        .subscribe(channel => {
          this.channel = JSON.parse(channel.toString());
          channelTemp = JSON.parse(channel.toString());
          let un: string = sessionStorage.getItem('username');
          let username: string = un;
          console.log(username);
          let youtubeUser = new Youtube();
          youtubeUser.usernameSH = username;
          youtubeUser.channelId = channelTemp.channelId;
          youtubeUser.profile_pic = channelTemp.profilePhoto;
          youtubeUser.username = channelTemp.username;
          this.youtubeService.postUser(youtubeUser);
        });

      return this.channel;
  }
  // getVideo() {
  //   this.youtubeService.getVideos()
  //     .subscribe(videoArr => {
  //       this.videoArr = new Array<Video>(videoArr.length);
  //       for(let i = 0; i < videoArr.length; i++) {
  //         let obj: Video = JSON.parse(videoArr[i].toString());
  //         this.videoArr[i] = obj;
  //       }
  //     })
  // }
  getLastPulled() {
    let d: Date = new Date();
    this.pullTime = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() + ' at ' + d.getHours() + ':' + d.getMinutes();
  }

  // getPlaylists() {
  //   this.youtubeService.getPlaylists()
  //     .subscribe(playlistArr => {
  //       this.playlistArr = playlistArr;
  //     })
  //   console.log(this.videoArr);
  // }

  // getLikedVideos() {
  //   this.youtubeService.getLikedVideos()
  //     .subscribe(likedArr => {
  //       this.likedArr = new Array<Video>(likedArr.length);
  //       for(let i = 0; i < likedArr.length; i++) {
  //         let obj: Video = JSON.parse(likedArr[i].toString());
  //         this.likedArr[i] = obj;
  //       }
  //     })
  // }

  getElements() {
    this.isVisibleSpinner = true;
    this.getLastPulled();
    this.getChannelInfo();
    setTimeout(() => {
      this.isVisibleSpinner = false;
      this.isVisible = true;
    }, 3000);

  }

}
