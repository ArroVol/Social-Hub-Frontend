import {Component, LOCALE_ID, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InstagramService} from '../service/instagram.service';
import {InstagramUserInfo} from '../model/instagram/InstagramUserInfo';


@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit {
  nums: Array<number> = [1, 20, 48];

  @ViewChild('oneItem') oneItem: any;
  @ViewChildren('count') count: QueryList<any>;

  constructor(private instagramService: InstagramService) {
  }


  instagramUser: InstagramUserInfo;

  images = new Array(18);

  options = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };



  ngOnInit(): void {

    this.getInstaUser();
    // this.storeImages();




    // Function is defined
    function hideloader() {

      // Setting display of spinner
      // element to none
      document.getElementById('loading')
        .style.display = 'none';
    }
  }


  storeImages(): void {
    for (let i = 0; i < this.getMediaCount(); i++) {
      this.images[i] = this.getImageUrl(i);
    }
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

    return this.instagramUser.imageFeed[pic].toString().substring(this.instagramUser.imageFeed[pic].toString().search('url') + 4,
      this.instagramUser.imageFeed[pic].toString().search('width') - 2);
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

      return 'No Name Listed';

    } else {
      return this.instagramUser.followerFeed[pic].toString().substring(0,
        this.instagramUser.followerFeed[pic].toString().search('ProfilePic:'));

    }
  }

  changeBio(bio: string){
    this.instagramService.changeBio(bio);
  }

}
