import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {InstagramService} from '../service/instagram.service';
import {InstagramUserInfo} from '../model/instagram/InstagramUserInfo';
import {InstagramComponent} from '../instagram/instagram.component';
import {InstagramUserSearchInfo} from '../model/instagram/InstagramUserSearchInfo';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private instagramService: InstagramService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  loading = false;
  public showChanges = false;
  public showSearch = false;
  public show = false;
  public buttonName: any = 'false';
  displayedColumns: string[] = ['position', 'name'];

  @ViewChild(MatSort) sort: MatSort;
  public isVisibleSpinner = true;
  public isVisible = false;


  durationInSeconds = 5;

  instagramUserSearch: InstagramUserInfo;

  followStatus: boolean;


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

        this.instagramPageLoad();

      });

  }

  instagramPageLoad() {
    setTimeout(() => {
      this.isVisibleSpinner = false;
      this.isVisible = true;
    }, 4000);

  }

  // checkStatus(user: string)  {
  //   check: Observable < Boolean> = this.instagramService.checkFollowingStatus(user);
  //   if (check == false) {
  //
  //   }
  // }
  checkFollowStatus(): string {
    if (this.instagramUserSearch.followingStatus) {
      return 'Unfollow';
    } else {
      return 'Follow';
    }

  }

  unFollowUser(user: string) {
    this.loading = true;
    this.instagramService.unfollowUser(user).subscribe();
    console.log('Unfollowed: ' + user);
    setTimeout(() => {
      this.closeModalDialog();
    }, 2000);
    this.openSnackBar('Unfollwed: ' + user);
  }

  followUser(user: string) {
    this.loading = true;
    this.instagramService.followUser(user).subscribe();
    console.log('Followed: ' + user);
    setTimeout(() => {
      this.closeModalDialog();
    }, 2000);
    this.openSnackBar('Follwed: ' + user);
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

  closeModalDialog() {
    this.dialog.closeAll(); //set none css after close dialog
  }

  openSnackBar(status: string) {
    this.snackBar.open(status, 'close', {
      duration: 2500,
    });
  }

}


