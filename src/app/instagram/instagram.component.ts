import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
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
  nums: Array<number> = [25, 76, 48];

  @ViewChild('oneItem') oneItem: any;
  @ViewChildren('count') count: QueryList<any>;

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


}
