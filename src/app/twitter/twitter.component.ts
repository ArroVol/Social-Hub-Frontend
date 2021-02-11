import { Component, OnInit } from '@angular/core';
import {TwitterService} from '../service/twitter.service';
import {Tweet} from '../model/twitter/Tweet';
import {Status} from 'tslint/lib/runner';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {

  tweet: Tweet;
  // status: string;
  statusText: string;
  status: Status;
  followerCount: number;
  timelineList: Tweet[];
  // twitter: Twitter;
  constructor(private twitterService: TwitterService) { }

  ngOnInit(): void {
  }
  getFollowerCount(value: string) {
    this.twitterService.getNumFollowersById(+value)
      .subscribe(followerCount => {
        this.followerCount = followerCount;
      });
    console.log('called the front end method get follower count');
    console.log(this.followerCount);
  }

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
  getUserStatusAsTweet(value: string) {
    this.twitterService.getUserStatusAsTweet(+value)
      .subscribe(tweet => {
        this.tweet = tweet;
        console.log('status text: ' + this.tweet.tweetText);
      });

  }
}
