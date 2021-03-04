import {Component, OnInit, ViewChild} from '@angular/core';
import {TwitterService} from '../service/twitter.service';
import {Tweet} from '../model/twitter/Tweet';
import {Status} from 'tslint/lib/runner';
import {Observable} from 'rxjs';
import {BriefStatus} from '../model/twitter/BriefStatus';
import {MatSort} from '@angular/material/sort';
import {SimpleFormComponent} from '../simple-form/simple-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {

  loggedIntoTwitter: boolean;
  tweet: Tweet;
  briefStatus: BriefStatus;
  // status: string;
  statusText: string;
  status: Status;
  followerCount: number;
  timelineList: Tweet[];
  timelineList$: Observable<Tweet[]>;
  // twitter: Twitter;
  // displayedColumns: string[] = ['content', 'creator'];
  displayedColumns: string[] = ['content', 'courseName', 'courseSubject', 'dayAndTime', 'roomNo', 'sectionNo', 'semester', 'status', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listData: MatTableDataSource<any>;

  constructor(private twitterService: TwitterService) { }

  /**
   * On page open get the recent post from the user and the number of followers.
   */
  ngOnInit(): void {
    if (sessionStorage.getItem('twitterHandle') !== null) {
      this.loggedIntoTwitter = true;
    }
    this.briefStatus = new BriefStatus();
    this.twitterService.getRecentPost(+sessionStorage.getItem('userId'))
      .subscribe(briefStatus => {
        this.briefStatus = briefStatus;
        console.log(this.briefStatus.createdAt);
      });
    if (sessionStorage.getItem('twitterHandle') !== null){
      this.twitterService.getRecentPostByHandle(sessionStorage.getItem('twitterHandle'))
        .subscribe(briefStatus => {
          this.briefStatus = briefStatus;
          console.log(this.briefStatus.createdAt);
        });
    }
    this.twitterService.getRecentPost(+sessionStorage.getItem('userId'))
      .subscribe(briefStatus => {
        this.briefStatus = briefStatus;
        console.log(this.briefStatus.createdAt);
      });
    this.twitterService.getNumFollowersById(1)
      .subscribe(followerCount => {
        this.followerCount = followerCount;
      });
    console.log('called the front end method get follower count');
    console.log(this.followerCount);
  }

  /**
   * Gets the follwoer count
   * @param value is the id for the user.
   */
  getFollowerCount(value: string) {
    this.twitterService.getNumFollowersById(+value)
      .subscribe(followerCount => {
        this.followerCount = followerCount;
      });
    console.log('called the front end method get follower count');
    console.log(this.followerCount);
  }

  /**
   * Posts the user tweets to their twitter. Make a call to the backend and then to the twitter API
   * @param value is the id for the user.
   * @param tweetContent is the content of the tweet.
   */
  postUserTweet(value: string, tweetContent: string) {
    console.log('in the post user tweet in the twitter ts');
    this.tweet = new Tweet();
    this.tweet.tweetCreator = 'socialhubclub';
    this.tweet.tweetText = tweetContent;
    this.twitterService.postUserTweet(this.tweet, 1)
      .subscribe(tweet => {
        this.tweet = tweet;
      });
    console.log('called the post user tweet');
    console.log(this.followerCount);
  }

  /**
   * Gets the user tweets from the twitter API.
   * @param value is the id for the user.
   */
  getUserTweets(value: string) {
    this.twitterService.getUserTweetsById(+value)
      .subscribe(tweet => {
        this.timelineList = tweet;
      });
    this.statusText = this.tweet.tweetText;
    console.log('status text: ' + this.statusText);
    console.log('called the front end method get tweets');
    console.log(this.followerCount);
  }
  /**
   * Gets the user tweets from the twitter API.
   * @param value is the id for the user.
   */
  getUserStatus(value: string) {
    this.twitterService.getUserStatus(+value)
      .subscribe(status => {
        this.status = status;
        console.log('status text: ' + this.statusText);
        console.log('called the front end method get statuts');
        console.log(this.status);
        console.log(status);
      });
  }

  /**
   * Gets the users most recent post from their feed.
   * @param value the id value for the user.
   */
    getRecentPost(value: string) {
      this.briefStatus = new BriefStatus();
      this.twitterService.getRecentPost(+value)
        .subscribe(briefStatus => {
          this.briefStatus = briefStatus;
          console.log(this.briefStatus.createdAt);
        });

  }

  /**
   * Gets the users status as a Tweet object.
   * @param value the id for the user.
   */
  getUserStatusAsTweet(value: string) {
    this.twitterService.getUserStatusAsTweet(+value)
      .subscribe(tweet => {
        this.tweet = tweet;
        console.log('status text: ' + this.tweet.tweetText);
      });

  }
  /**
   * Gets the users timeline.
   * @param value the id for the user.
   */
  getTimeline(value: string) {
    console.log('in the twitter componenet get timeline method');
    this.twitterService.getTimeline(+value)
      .subscribe(tweet => {
        this.timelineList = tweet;
        this.listData = new MatTableDataSource<any>(this.timelineList);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        console.log(this.timelineList.length);
        // console.log('status text: ' + this.tweet.tweetText);
        for (let i = 0; i < this.timelineList.length; i++){
            console.log(this.timelineList[i].tweetText);
        }
      });

  }
}
