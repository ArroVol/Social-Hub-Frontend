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

  instagramUser: InstagramUserInfo;

  constructor(private instagramService: InstagramService) { }


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


}
