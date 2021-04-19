import {Component, Inject, LOCALE_ID, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InstagramService} from '../service/instagram.service';
import {InstagramUserInfo} from '../model/instagram/InstagramUserInfo';
import {InstagramUserSearchInfo} from '../model/instagram/InstagramUserSearchInfo';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InstagramSearchComponent} from '../instagram-search/instagram-search.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit {

  constructor(private instagramService: InstagramService, public dialog: MatDialog,  ) {
  }
  public showChanges = false;
  public showSearch = false;
  public buttonName: any = 'Change';
  public isVisibleSpinner = true;
  public isVisible = false;
  dialogRef = 'none';
  nums: Array<number> = [1, 20, 48];

  @ViewChild('oneItem') oneItem: any;
  @ViewChildren('count') count: QueryList<any>;


  instagramUser: InstagramUserInfo;

  instagramUserSearch: InstagramUserSearchInfo;

  images = new Array(18);

  bio: String;

  animal: string;
  name: string;




  ngOnInit(): void {

    this.instagramPageLoad();
    this.getInstaUser();
    // this.storeImages();



  }


  storeImages(): void {
    for (let i = 0; i < this.getMediaCount(); i++) {
      this.images[i] = this.getImageUrl(i);
    }
  }


  instagramPageLoad() {
    setTimeout(() => {
      this.isVisibleSpinner = false;
      this.isVisible = true;
    }, 4000);

  }

  getInstaUser(): InstagramUserInfo {
    this.instagramService.getInsta().subscribe(instagramUser => {
      this.instagramUser = instagramUser;
      return this.instagramUser;
    });
    console.log('Get User Profile Called!');
    return this.instagramUser;

  }

  userSearch(user: string){
    this.instagramService.getSearchInsta(user).subscribe(user => {
      this.instagramUserSearch = user;
      console.log('Get Search User Profile Called!');
      console.log(this.instagramUserSearch.displayName);
    });

    this.showSearch = !this.showSearch;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.showSearch) {
      this.buttonName = 'Hide';
    }
    else {
      this.buttonName = 'Change';
    }
  }

  getMediaCount(): number {
    return this.instagramUser.mediaCount;
  }

  getImageUrl(pic: number): string{

    return this.instagramUser.imageFeed[pic].toString().substring(this.instagramUser.imageFeed[pic].toString().search('url') + 4,
      this.instagramUser.imageFeed[pic].toString().search('width') - 2);
  }

  getSearchImageUrl(pic: number): string{

    return this.instagramUserSearch.imageFeed[pic].toString().substring(
      this.instagramUserSearch.imageFeed[pic].toString().search('url') + 4,
      this.instagramUserSearch.imageFeed[pic].toString().search('width') - 2);
  }
  animateCount() {
    // tslint:disable-next-line:variable-name
    let _this = this;

    let single = this.oneItem.nativeElement.innerHTML;

    this.counterFunc(single, this.oneItem, 7000);

    this.count.forEach(item => {
      _this.counterFunc(item.nativeElement.innerHTML, item, 2000);
    });
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

  counter(i: number) {
    return new Array(i);
  }

  getFollowerProfilePic(pic: number): string{
    return this.instagramUser.followerFeed[pic].toString().substring(
      this.instagramUser.followerFeed[pic].toString().search('ProfilePic:') + 11,
      this.instagramUser.imageFeed[pic].toString().length);
  }
  getUserFollowerProfilePic(pic: number): string{
    return this.instagramUserSearch.followerFeed[pic].toString().substring(
      this.instagramUserSearch.followerFeed[pic].toString().search('ProfilePic:') + 11,
      this.instagramUserSearch.imageFeed[pic].toString().length);
  }

  getComment(pic: number): string{
    if (this.instagramUser.imageFeedComment[pic].toString().substring(
      this.instagramUser.imageFeedComment[pic].toString().search('text=') + 5,
      this.instagramUser.imageFeedComment[pic].toString().search(', type='))
      === this.instagramUser.imageFeedCaption[pic]) {
        return null;
    }
    else {
        return this.instagramUser.imageFeedComment[pic].toString().substring(
          this.instagramUser.imageFeedComment[pic].toString().search('text=') + 5,
          this.instagramUser.imageFeedComment[pic].toString().search(', type='));
    }

  }

getFollowerProfileName(pic: number): string{
    if (this.instagramUser.followerFeed[pic].toString().substring(0,
      this.instagramUser.followerFeed[pic].toString().search('ProfilePic:')) === null
    || this.instagramUser.followerFeed[pic].toString().substring(0,
        this.instagramUser.followerFeed[pic].toString().search('ProfilePic:')) === ' ') {

      return 'Private Account';

    } else {
      return this.instagramUser.followerFeed[pic].toString().substring(0,
        this.instagramUser.followerFeed[pic].toString().search('ProfilePic:'));

    }
  }

  getUserFollowerProfileName(pic: number): string{
    if (this.instagramUserSearch.followerFeed[pic].toString().substring(0,
      this.instagramUserSearch.followerFeed[pic].toString().search('ProfilePic:')) === null
      || this.instagramUserSearch.followerFeed[pic].toString().substring(0,
        this.instagramUserSearch.followerFeed[pic].toString().search('ProfilePic:')) === ' ') {

      return 'Private Account';

    } else {
      return this.instagramUserSearch.followerFeed[pic].toString().substring(0,
        this.instagramUserSearch.followerFeed[pic].toString().search('ProfilePic:'));

    }
  }

  changeBio(bio: string){
    this.instagramService.changeBio(bio).subscribe(bio => {
      this.bio = bio;
    });

  }




  toggleChanges() {
    this.showChanges = !this.showChanges;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.showChanges) {
      this.buttonName = 'Hide';
    }
    else {
      this.buttonName = 'Change';
    }
  }


  toggleSearch() {

  }

  openDialog(): void {
    this.dialog.open(InstagramSearchComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    // this.dialog.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }



}

