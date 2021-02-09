import { Component, OnInit } from '@angular/core';
import {TwitterService} from '../service/twitter.service';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {

  followerCount: number;
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
}
