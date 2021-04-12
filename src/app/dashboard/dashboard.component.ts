// @ts-ignore
import { Component, OnInit } from '@angular/core';
import {Channel} from '../model/youtube/Channel';
import {YoutubeService} from '../service/youtube.service';
import {InstagramService} from '../service/instagram.service';
import {InstagramUserInfo} from '../model/instagram/InstagramUserInfo';
import {InstagramComponent} from '../instagram/instagram.component';
import {TwitterService} from '../service/twitter.service';
import {BriefStatus} from '../model/twitter/BriefStatus';
import * as moment from 'moment';
import {Goal} from '../model/user/Goal';
import {GoalService} from '../service/goal.service';
import {Moment} from 'moment';
// @ts-ignore
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

  constructor(private youtubeService: YoutubeService, private twitterService: TwitterService, private goalService: GoalService) {
  }

  otherHandle: string;
  otherBriefStatusList: BriefStatus[];
  otherNumFollowers: number;
  otherMostRetweeted: BriefStatus;
  otherMostFavorited: BriefStatus;
  userGoal: Goal;
  goalSet: boolean;
  currentDate: Moment;
  endDate: Moment;
  endDateString: string;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 10;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;
  twitterHandleFound: boolean;
  briefStatus: BriefStatus;
  briefStatusList: BriefStatus[];
  twitterHandle: string;
  instagramUser: InstagramUserInfo;
  selected = 'channelInsights';
  selectedVideo = 'mostRecent';
  counter: [];
  twitterFollowerCount;
  ngOnInit(): void {
    this.getChannel();
    // this.instagramUser = this.instagramComponent.getInstaUser();
    // this.counter = this.instagramComponent.counter(0);
    this.getRecentPost();
    this.getNumFollowers();
    this.twitterHandleFound = Boolean(sessionStorage.getItem('twitterHandleFound'));
    this.twitterHandle = sessionStorage.getItem('twitterHandle');
    this.getUserTimeline();

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

  async getNumFollowers() {
    this.twitterService.getNumFollowersByHandle(sessionStorage.getItem('twitterHandle'))
      .subscribe(async followerCount => {
        console.log('returned follower count: ' + followerCount);
        this.twitterFollowerCount = +followerCount;
        console.log('called the front end method get follower count');
        console.log(this.twitterFollowerCount);
        // this.checkForGoals();
        // this.getUserTimeline();
        this.checkForGoals();
      });
  }

  getUserTimeline() {
    this.otherBriefStatusList = null;
    this.otherMostRetweeted = null;
    this.twitterHandle = sessionStorage.getItem('twitterHandle');
    this.twitterService.getUserTimeline(this.twitterHandle)
      .subscribe(otherTimeline => {
        this.otherBriefStatusList = otherTimeline;
        this.otherMostRetweeted = this.otherBriefStatusList[0];
        this.otherMostFavorited = this.otherBriefStatusList[1];
        if (this.otherMostRetweeted.retweetCount === 0){

        } else if (this.otherMostFavorited.favoriteCount === 0 && this.otherMostRetweeted.retweetCount > 0) {
          this.otherBriefStatusList = this.otherBriefStatusList.slice(1);
        } else {
          this.otherBriefStatusList = this.otherBriefStatusList.slice(2);
        }
        // this.showOtherDiv = true;

        this.twitterService.getNumFollowersByHandle(this.twitterHandle)
          .subscribe(otherNumFollowers => {
            this.otherNumFollowers = otherNumFollowers;
            console.log('other num followers: ' + this.otherNumFollowers);
          });

      });
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
 async getRecentPost() {
    this.twitterService.getRecentPostByHandle(sessionStorage.getItem('twitterHandle'))
      .subscribe(async briefStatus => {
        this.briefStatus = briefStatus;
        console.log(this.briefStatus.createdAt);
      });
  }

  checkForGoals() {
    console.log('checkign for goals');
    this.goalService.getGoalByUserId(sessionStorage.getItem('userId'))
      .subscribe(goal => {
        this.userGoal = goal;
        if (this.userGoal !== null){
          this.goalSet = true;
          this.value = this.twitterFollowerCount - this.userGoal.goalStartNumber;
          this.max = this.userGoal.goalMaxNumber;
          console.log('current numbr');
          console.log(this.value);
          this.endDate = moment(this.userGoal.startDate);
          console.log(this.endDate.calendar() + '  : end date');
          this.endDate = this.endDate.add(7, 'days');
          console.log('finalend date: ' + this.endDate.format('YYYY-MM-DD'));
          this.endDateString = this.endDate.format('YYYY-MM-DD');

        } else {
          console.log('null goals');
        }
      });
  }
  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  getOtherUserTimeline(otherTwitterHandle: string) {
    this.otherBriefStatusList = null;
    this.otherMostRetweeted = null;
    this.otherHandle = sessionStorage.getItem('twitterHandle');
    console.log('OTHER HANDLE ****');
    console.log(this.otherHandle);
    this.twitterService.getUserTimeline(this.otherHandle)
      .subscribe(otherTimeline => {
        this.otherBriefStatusList = otherTimeline;
        this.otherMostRetweeted = this.otherBriefStatusList[0];
        this.otherMostFavorited = this.otherBriefStatusList[1];
        console.log('*************');
        console.log(this.otherMostFavorited.text);
        if (this.otherMostRetweeted.retweetCount === 0){

        } else if (this.otherMostFavorited.favoriteCount === 0 && this.otherMostRetweeted.retweetCount > 0) {
          this.otherBriefStatusList = this.otherBriefStatusList.slice(1);
        } else {
          this.otherBriefStatusList = this.otherBriefStatusList.slice(2);
        }
        for (let i = 0; i < this.otherBriefStatusList.length; i++){
        }

        this.twitterService.getNumFollowersByHandle(otherTwitterHandle)
          .subscribe(otherNumFollowers => {
            this.otherNumFollowers = otherNumFollowers;
            console.log('other num followers: ' + this.otherNumFollowers);
          });

      });
  }
}
