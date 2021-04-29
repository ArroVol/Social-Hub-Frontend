
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MessageService} from '../message.service';

import {tap} from 'rxjs/operators';
import {InstagramUserInfo} from '../model/instagram/InstagramUserInfo';
import {User} from '../model/user/User';
import {OnePosts} from '../model/user/OnePosts';


const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});

@Injectable({
  providedIn: 'root'
})
export class InstagramService {


  private instagramUrl = 'http://localhost:8080/api/instagram';

  constructor(private http: HttpClient) {
  }

  getInsta(): Observable<InstagramUserInfo> {


    console.log('getting instagram authorization');
    const url = `${this.instagramUrl}/user`;
    return this.http.get<InstagramUserInfo>(url)
      .pipe(
        tap(_ => console.log('fetched authorization link'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }


  getSearchInsta(user: string): Observable<InstagramUserInfo> {

    console.log('getting search instagram profile for ' + user);
    const url = `${this.instagramUrl}/userSearch?user=${user}`;
    return this.http.get<InstagramUserInfo>(url, {headers})
      .pipe(
        tap(_ => console.log('fetched search user profile'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  checkFollowingStatus(user: string): Observable<boolean> {

    console.log('checking following status with: ' + user);
    const url = `${this.instagramUrl}/followingStatus`;
    return this.http.post<boolean>(url, user, {headers})
      .pipe(
        tap(_ => console.log('checking following status'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

   changeBio(bio: string) {
     console.log('changing bio' + bio);
     const url = `${this.instagramUrl}/bioChange`;
     return this.http.post<String>(url, bio, {headers})
       .pipe(
         tap(_ => console.log('sent Bio Change' ))
         // catchError(() => observableThrowError('get registration by id error'))
       );
   }

  followUser(user: string) {
    console.log('following' + user);
    const url = `${this.instagramUrl}/followUserSearch`;
    return this.http.post(url, user, {headers})
      .pipe(
        tap(_ => console.log('sent follow request' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }

  unfollowUser(user: string) {
    console.log('unfollowing' + user);
    const url = `${this.instagramUrl}/unfollowUserSearch`;
    return this.http.post(url, user, {headers})
      .pipe(
        tap(_ => console.log('sent unfollow request' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }

  postUser(user: string, password: string) {
    const url = `${this.instagramUrl}/user/newInstaUser/${user}/${password}`;
    return this.http.post<String>(url, {headers})
      .pipe(
        tap(_ => console.log('sent the registration' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }

  uploadImage(formdata: FormData) {
    const url = `${this.instagramUrl}/uploadImage`;
    console.log('hitting upload image');
    return this.http.post<FormData>(url, JSON.stringify(formdata), {headers})
      .pipe(
        tap(_ => console.log('sent the registration' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }

}
