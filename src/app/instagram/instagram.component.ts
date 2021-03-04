import {Component, LOCALE_ID, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InstagramService} from '../service/instagram.service';
import {InstagramUserInfo} from '../model/instagram/InstagramUserInfo';
import {DatePipe, formatDate, FormatWidth, getLocaleDateTimeFormat} from '@angular/common';

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
    this.storeImages();



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

    return this.instagramUser.imageFeed[pic].toString().substring(15, this.instagramUser.imageFeed[pic].toString().search('width') - 1);
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

}
