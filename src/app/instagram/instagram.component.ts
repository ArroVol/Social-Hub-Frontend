import { Component, OnInit } from '@angular/core';
import {InstagramService} from '../service/instagram.service';
import {Observable} from 'rxjs';
import {InstagramUserInfo} from '../model/instagram/InstagramUserInfo';
import {HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit {

  constructor(private instagramService: InstagramService) { }



  instagramUser: InstagramUserInfo;

  images = new Array(18);





  ngOnInit(): void {
    this.getInstaUser();
  }

  getInstaUser() {
    this.instagramService.getInsta().subscribe(instagramUser => {
      this.instagramUser = instagramUser;
    });
    console.log('Get User Profile Called!');
  }

  getMediaCount(): number {
    return this.instagramUser.mediaCount;
  }

  getImageUrl(pic: number): string{

    return this.instagramUser.imageFeed[pic].toString().substring(15, this.instagramUser.imageFeed[pic].toString().search('width') - 1);
  }


}
