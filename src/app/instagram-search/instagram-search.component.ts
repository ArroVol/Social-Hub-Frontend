import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {InstagramService} from '../service/instagram.service';
import {InstagramUserInfo} from '../model/instagram/InstagramUserInfo';
import {InstagramComponent} from '../instagram/instagram.component';
import {InstagramUserSearchInfo} from '../model/instagram/InstagramUserSearchInfo';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
}


@Component({
  selector: 'app-instagram-search',
  templateUrl: './instagram-search.component.html',
  styleUrls: ['./instagram-search.component.css']
})


export class InstagramSearchComponent implements OnInit {

  constructor(private instagramService: InstagramService, public dialog: MatDialog) {
  }

  public showChanges = false;
  public showSearch = false;
  public show = false;
  public buttonName: any = 'false';
  displayedColumns: string[] = ['position', 'name'];

  @ViewChild(MatSort) sort: MatSort;

  followStatus: boolean;

  instagramUserSearch: InstagramUserSearchInfo;


  counter(i: number) {
    return new Array(i);
  }

  ngOnInit(): void {
  }

  userSearch(user: string) {
    this.showSearch = true;

    this.instagramService.getSearchInsta(user)
      .subscribe(user => {
        this.instagramUserSearch = user;
        console.log('Get Search User Profile Called!');
        console.log(this.instagramUserSearch.displayName);
      });


    // // CHANGE THE NAME OF THE BUTTON.
    // if (this.instagramService.checkFollowingStatus(user)) {
    //   this.buttonName = 'Follow';
    // } else {
    //   this.buttonName = 'UnFollow';
    // }
  }

  // checkStatus(user: string)  {
  //   check: Observable < Boolean> = this.instagramService.checkFollowingStatus(user);
  //   if (check == false) {
  //
  //   }
  // }
  checkFollowStatus(user: string): void {
    this.instagramService.checkFollowingStatus(user).subscribe(checkFollowStatus => {
      this.followStatus = checkFollowStatus;
      console.log('Checked Following Status');
    });


  }

  unFollowUser(user: string) {
    this.instagramService.unfollowUser(user).subscribe();
    console.log('Unfollowed: ' + user);
  }

  followUser(user: string) {
    this.instagramService.followUser(user).subscribe();
    console.log('Followed: ' + user);
  }


  toggleChanges() {
    this.showChanges = !this.showChanges;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.showChanges) {
      this.buttonName = 'Follow';
    } else {
      this.buttonName = 'UnFollow';
    }
  }


}
