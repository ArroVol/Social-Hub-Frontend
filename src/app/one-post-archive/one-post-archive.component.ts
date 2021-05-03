import { Component, OnInit } from '@angular/core';
import {ImageService} from "../service/image.service";
import {HttpClient} from "@angular/common/http";
import {OnePostService} from "../service/one-posts/service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFireStorage} from "@angular/fire/storage";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-one-post-archive',
  templateUrl: './one-post-archive.component.html',
  styleUrls: ['./one-post-archive.component.css']
})
export class OnePostArchiveComponent implements OnInit {

  imageList: any[];
  shortenedImageList: any[];
  userId: number;
  rowIndexArray: any[];
  savedOnePostList: any[];
  selectedSocialMedia: string;
  onePostsBySocialMedia: any[];


  constructor(private imageService: ImageService,
              private http: HttpClient,
              private onePostService: OnePostService,
              public snackBar: MatSnackBar,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.imageService.getImageDetailList();
    this.getFirebaseOnePosts();
    this.userId = +sessionStorage.getItem('userId');

  }


  getFirebaseOnePosts() {
    this.imageService.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => {
          return item.payload.val();
        });
        this.savedOnePostList = this.imageList;
        console.log(this.imageList.length);
        this.imageList = this.imageList.reverse();
        if (this.imageList.length > 20) {
          this.shortenedImageList = this.imageList.slice(0, 20);
        }
        console.log('this is the shortened lenght... : ' + this.shortenedImageList.length);
        console.log(this.shortenedImageList[0].textContent);

        // for (let i = 0; i < this.imageList.length; i++){
        //   console.log(this.imageList[i].userId);
        //   console.log(this.imageList[i].textContent);
        //
        // }
        this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 1)).keys());
        console.log('length of indexarray... ' + this.rowIndexArray.length);
      }
    );
  }

  selectChangeHandler(event: any) {
    this.imageList = this.savedOnePostList;
    console.log(event);
    if (event.toString() !== 'All') {

      this.selectedSocialMedia = event.toString();
      this.onePostsBySocialMedia = new Array();
      for (let i = 0; i < this.imageList.length; i++) {
        console.log(this.imageList[i].socialMedia);
        if (this.imageList[i].socialMedia.includes(this.selectedSocialMedia.toLowerCase())) {
          console.log('true');
          console.log(this.imageList[i]);

          this.onePostsBySocialMedia.push(this.imageList[i]);
        }
      }

      // for (let i = 0; i < this.onePostsBySocialMedia.length; i++) {
      //   console.log(this.onePostsBySocialMedia[i].socialMedia);
      //   console.log(this.onePostsBySocialMedia[i].textContent);
      // }
      this.imageList = this.onePostsBySocialMedia;
    }

  }
}

