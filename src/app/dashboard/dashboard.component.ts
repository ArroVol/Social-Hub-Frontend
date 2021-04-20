// @ts-ignore
import {Component, OnInit} from '@angular/core';
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
import {InstagramUserSearchInfo} from '../model/instagram/InstagramUserSearchInfo';
import {SpotifyService} from "../service/spotify.service";
import {SpotifyUser} from "../model/spotify/SpotifyUser";
import {SpotifyTrack} from "../model/spotify/SpotifyTrack";


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
  public showChanges = false;
  public showSearch = false;
  public buttonName: any = 'Change';
  public isVisibleSpinner = true;
  public isVisible = false;
  channel: Channel;

  constructor(private instagramService: InstagramService,
              private youtubeService: YoutubeService,
              private twitterService: TwitterService,
              private goalService: GoalService,
              private spotifyService: SpotifyService) {
  }

  instagramUser: InstagramUserInfo;

  instagramUserSearch: InstagramUserSearchInfo;

  images = new Array(18);

  bio: String;
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
  selected = 'channelInsights';
  selectedVideo = 'mostRecent';
  counter: [];
  twitterFollowerCount;
  isMinWidth = true;


  // Spotify Fields
  spotifyUser: SpotifyUser;
  spotifyUserRecentTracks: SpotifyTrack[];
  spotifyUserFavouriteTracks: SpotifyTrack[];


  ngOnInit(): void {

    // this.getInstaUser();
    // this.getChannel();
    // window.addEventListener('resize', (e) => {
    //   if (window.matchMedia('(min-width: 1050px)').matches) {
    //     this.isMinWidth = true;
    //   } else {
    //     this.isMinWidth = false;
    //   }
    // });
    // this.instagramUser = this.instagramComponent.getInstaUser();
    // this.counter = this.instagramComponent.counter(0);
    // this.getRecentPost();
    // this.getNumFollowers();
    // this.twitterHandleFound = Boolean(sessionStorage.getItem('twitterHandleFound'));
    // this.twitterHandle = sessionStorage.getItem('twitterHandle');
    // this.getUserTimeline();
    this.getSpotifyUser();
    this.getSpotifyUserFavouriteTracks();
    this.getSpotifyUserRecentTracks();


  }

  // Spotify Methods
  getSpotifyUser() {
    this.spotifyService.getUserProfile().subscribe(user => console.log(this.spotifyUser = user));
  }

  getSpotifyUserRecentTracks() {
    this.spotifyService.getUserRecentTracks().subscribe(recentTracks => console.log(this.spotifyUserRecentTracks = recentTracks));
  }

  getSpotifyUserFavouriteTracks() {
    this.spotifyService.getUserFollowedTracks().subscribe(favouriteTracks => console.log(this.spotifyUserFavouriteTracks = favouriteTracks));
  }

  instagramPageLoad() {
    setTimeout(() => {
      this.isVisibleSpinner = false;
      this.isVisible = true;
    }, 5000);
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
    for (let i = 0; i < videos.length; i++) {
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
    for (let i = 0; i < videos.length; i++) {
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
    for (let i = 0; i < videos.length; i++) {
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
    for (let i = 0; i < videos.length; i++) {
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
    for (let i = 0; i < videos.length; i++) {
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
    for (let i = 0; i < videos.length; i++) {
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
    for (let i = 0; i < videos.length; i++) {
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
    for (let i = 0; i < videos.length; i++) {
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
    console.log('getting the users timeline...');
    this.twitterService.getUserTimeline(this.twitterHandle)
      .subscribe(timeline => {
        this.briefStatusList = timeline;
        console.log('the length  of hte users timeline list: ' + this.briefStatusList.length);
        this.briefStatusList = this.briefStatusList.slice(1);

        for (let i = 0; i < this.briefStatusList.length; i++) {
          console.log(this.briefStatusList[i].text);
        }
        this.getOtherUserTimeline('SocialHubClub');


      });
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
        if (this.userGoal !== null) {
          this.goalSet = true;
          this.value = this.twitterFollowerCount - this.userGoal.goalStartNumber;
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
        if (this.otherMostRetweeted.retweetCount === 0) {

        } else if (this.otherMostFavorited.favoriteCount === 0 && this.otherMostRetweeted.retweetCount > 0) {
          this.otherBriefStatusList = this.otherBriefStatusList.slice(1);
        } else {
          this.otherBriefStatusList = this.otherBriefStatusList.slice(2);
        }
        for (let i = 0; i < this.otherBriefStatusList.length; i++) {
        }

        this.twitterService.getNumFollowersByHandle(otherTwitterHandle)
          .subscribe(otherNumFollowers => {
            this.otherNumFollowers = otherNumFollowers;
            console.log('other num followers: ' + this.otherNumFollowers);
          });

      });
  }


  // Instagram Dashboard


  storeImages(): void {
    for (let i = 0; i < this.getMediaCount(); i++) {
      this.images[i] = this.getImageUrl(i);
    }
  }

  getInstaUser(): InstagramUserInfo {
    this.instagramService.getInsta().subscribe(instagramUser => {
      this.instagramUser = instagramUser;
      return this.instagramUser;
    });
    return this.instagramUser;
    console.log('Get User Profile Called!');
  }

  userSearch(user: string) {
    this.instagramService.getSearchInsta(user).subscribe(user => {
      this.instagramUserSearch = user;
      console.log('Get Search User Profile Called!');
      console.log(this.instagramUserSearch.displayName);
    });

    this.showSearch = !this.showSearch;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.showSearch) {
      this.buttonName = 'Hide';
    } else {
      this.buttonName = 'Change';
    }
  }

  getMediaCount(): number {
    return this.instagramUser.mediaCount;
  }

  getImageUrl(pic: number): string {

    return this.instagramUser.imageFeed[pic].toString().substring(this.instagramUser.imageFeed[pic].toString().search('url') + 4,
      this.instagramUser.imageFeed[pic].toString().search('width') - 2);
  }


  counterFunc(end: number, element: any, duration: number) {
    let range, current: number, step, timer;

    range = end - 0;
    current = 0;
    step = Math.abs(Math.floor(duration / range));

    timer = setInterval(() => {
      current += 1;
      element.nativeElement.textContent = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, step);
  }

  counterInstagram(i: number) {
    return new Array(i);
  }

  getFollowerProfilePic(pic: number): string {
    return this.instagramUser.followerFeed[pic].toString().substring(
      this.instagramUser.followerFeed[pic].toString().search('ProfilePic:') + 11,
      this.instagramUser.imageFeed[pic].toString().length);
  }

  getUserFollowerProfilePic(pic: number): string {
    return this.instagramUserSearch.followerFeed[pic].toString().substring(
      this.instagramUserSearch.followerFeed[pic].toString().search('ProfilePic:') + 11,
      this.instagramUserSearch.imageFeed[pic].toString().length);
  }

  getComment(pic: number): string {
    if (this.instagramUser.imageFeedComment[pic].toString().substring(
      this.instagramUser.imageFeedComment[pic].toString().search('text=') + 5,
      this.instagramUser.imageFeedComment[pic].toString().search(', type='))
      === this.instagramUser.imageFeedCaption[pic]) {
      return null;
    } else {
      return this.instagramUser.imageFeedComment[pic].toString().substring(
        this.instagramUser.imageFeedComment[pic].toString().search('text=') + 5,
        this.instagramUser.imageFeedComment[pic].toString().search(', type='));
    }

  }

  getFollowerProfileName(pic: number): string {
    if (this.instagramUser.followerFeed[pic].toString().substring(0,
      this.instagramUser.followerFeed[pic].toString().search('ProfilePic:')) === null
      || this.instagramUser.followerFeed[pic].toString().substring(0,
        this.instagramUser.followerFeed[pic].toString().search('ProfilePic:')) === ' ') {

      return 'No Name Listed';

    } else {
      return this.instagramUser.followerFeed[pic].toString().substring(0,
        this.instagramUser.followerFeed[pic].toString().search('ProfilePic:'));

    }
  }


  changeBio(bio: string) {
    this.instagramService.changeBio(bio).subscribe(bio => {
      this.bio = bio;
    });

  }


  toggleChanges() {
    this.showChanges = !this.showChanges;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.showChanges) {
      this.buttonName = 'Hide';
    } else {
      this.buttonName = 'Change';
    }
  }

  // Convert milliseconds to minutes and seconds
  transform(input: string) {
    let minutes: string | number = Math.floor((parseInt(input) / (1000 * 60)) % 60);
    let seconds: string | number = Math.floor((parseInt(input) / 1000) % 60);
    let formatted_minutes = (minutes < 10) ? '0' + minutes : minutes;
    let formatted_seconds = (seconds < 10) ? '0' + seconds : seconds;
    return formatted_minutes + ':' + formatted_seconds;
  }


}

