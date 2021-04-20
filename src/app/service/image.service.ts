import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MessageService} from '../message.service';
import {User} from '../model/user/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Tweet} from '../model/twitter/Tweet';
import { Component } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {OnePosts} from "../model/user/OnePosts";
// import "rxjs/add/operator/map";



const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json' });
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  title = 'dropzone';
  imageDetailList: AngularFireList<any>;
  files: File[] = [];
  userId: string;
  fireBasePath: string;
  private imageUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private storage: AngularFireStorage,
              private firebase: AngularFireDatabase) {}

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})

  };

  /** GET user by username from the server */
  postProfilePicture(image: File) {
    const fd = new FormData();
    fd.append('image', image, image.name);
    console.log('in the post image ');
    this.userId = sessionStorage.getItem('userId');
    console.log(this.userId);
    const url = `${this.imageUrl}/user/save/profileImage/${this.userId}`;
    return this.http.post<User>(url, JSON.stringify(fd), {headers})
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[i]);
    }

    this.http.post('http://localhost:8001/upload.php', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getImageDetailList(){
    this.fireBasePath = sessionStorage.getItem('userId');
    // this.imageDetailList = this.firebase.list('imageDetails');
    this.imageDetailList = this.firebase.list(this.fireBasePath);
    // this.imageDetailList.map((array) => array.reverse()) as FirebaseListObservable<any[]>;


    console.log('this is the image detail list: ' + this.imageDetailList);
  }

  insertImageDetails(imageDetails){
    console.log('in the image service insert...');
    console.log(imageDetails);
    console.log(imageDetails.userId);
    console.log(imageDetails.imageUrl);
    console.log(imageDetails.textContent);

    this.imageDetailList.push({
      userId: sessionStorage.getItem('userId'),
      textContent: imageDetails.textContent,
      socialMedia: imageDetails.socialMedia,
      createAt: new Date().toDateString(),
      imageUrl: imageDetails.imageUrl
    });
  }
}
