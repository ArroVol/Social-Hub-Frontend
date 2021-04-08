import {Component, Input, OnInit} from '@angular/core';
import {InstagramService} from '../service/instagram.service';
import {InstagramUserInfo} from '../model/instagram/InstagramUserInfo';
import {InstagramComponent} from '../instagram/instagram.component';
import {YoutubeComponent} from '../youtube/youtube.component';
import {Youtube} from '../model/youtube/Youtube';
import {YoutubeService} from '../service/youtube.service';
import {Channel} from '../model/youtube/Channel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
/**
 * The Class for the dashboard component.
 */
export class DashboardComponent implements OnInit {
  channel: Channel;
  constructor(private youtubeService: YoutubeService) {
  }


  instagramUser: InstagramUserInfo;
  selected = 'channelInsights';
  selectedVideo = 'mostRecent';
  isMinWidth = true;
  ngOnInit(): void {
    this.getChannel();

    window.addEventListener('resize', (e) => {
      if (window.matchMedia('(min-width: 1050px)').matches) {
        this.isMinWidth = true;
      } else {
        this.isMinWidth = false;
      }
    });
  }
  getChannel() {
    this.youtubeService.getChannelInfo().subscribe(channel => {
      this.channel = JSON.parse(channel.toString());
    });
  }

  getUsername(): string {
    return sessionStorage.getItem('username');
  }
  getIndexOfMinLikes(): number {
    let videos = this.channel.videos;
    let min = Infinity;
    let minIndex = 0;
    for (let i = 0 ; i < videos.length; i++) {
      if (videos[i].videoDetails.likes < min) {
        min = videos[i].videoDetails.likes;
        minIndex = i;
      }
    }
    return minIndex;
  }
  getIndexOfMinViews(): number {
    let videos = this.channel.videos;
    let min = Infinity;
    let minIndex = 0;
    for (let i = 0 ; i < videos.length; i++) {
      if (videos[i].videoDetails.views < min) {
        min = videos[i].videoDetails.views;
        minIndex = i;
      }
    }
    return minIndex;
  }
  getIndexOfMinFavorites(): number {
    let videos = this.channel.videos;
    let min = Infinity;
    let minIndex = 0;
    for (let i = 0 ; i < videos.length; i++) {
      if (videos[i].videoDetails.views < min) {
        min = videos[i].videoDetails.views;
        minIndex = i;
      }
    }
    return minIndex;
  }

  getIndexOfMinDislikes(): number {
    let videos = this.channel.videos;
    let min = Infinity;
    let minIndex = 0;
    for (let i = 0 ; i < videos.length; i++) {
      if (videos[i].videoDetails.dislikes < min) {
        min = videos[i].videoDetails.dislikes;
        minIndex = i;
      }
    }
    return minIndex;
  }

  getIndexOfMaxLikes() {
    let videos = this.channel.videos;
    let max = 0;
    let maxIndex = 0;
    for (let i = 0 ; i < videos.length; i++) {
      if (videos[i].videoDetails.likes > max) {
        max = videos[i].videoDetails.likes;
        maxIndex = i;
      }
    }
    return maxIndex;
  }

  getIndexOfMaxDislikes() {
    let videos = this.channel.videos;
    let max = 0;
    let maxIndex = 0;
    for (let i = 0 ; i < videos.length; i++) {
      if (videos[i].videoDetails.dislikes > max) {
        max = videos[i].videoDetails.dislikes;
        maxIndex = i;
      }
    }
    return maxIndex;
  }

  getIndexOfMaxViews() {
    let videos = this.channel.videos;
    let max = 0;
    let maxIndex = 0;
    for (let i = 0 ; i < videos.length; i++) {
      if (videos[i].videoDetails.views > max) {
        max = videos[i].videoDetails.views;
        maxIndex = i;
      }
    }
    return maxIndex;
  }

  getIndexOfMaxFavorites() {
    let videos = this.channel.videos;
    let max = 0;
    let maxIndex = 0;
    for (let i = 0 ; i < videos.length; i++) {
      if (videos[i].videoDetails.favorites > max) {
        max = videos[i].videoDetails.favorites;
        maxIndex = i;
      }
    }
    return maxIndex;
  }
}
