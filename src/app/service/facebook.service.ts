import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MessageService} from '../message.service';
import {tap} from 'rxjs/operators';
import {FacebookUser} from '../model/facebook/FacebookUser';
import {FacebookPosts} from '../model/facebook/FacebookPosts';

const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
@Injectable({
  providedIn: 'root'
})
export class FacebookService{
  httpOptions = {
    headers
  };
  private facebookURL = 'http://localhost:8080/facebook';

  constructor(private http: HttpClient) {
  }

  getUserName(): Observable<FacebookUser>{
    console.log('Getting FB User');
    const url = `${this.facebookURL}/username`;
    return this.http.get<FacebookUser>(url)
      .pipe(
        tap(_ => console.log('Got FB user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  getPosts(): Observable<FacebookPosts>{
    console.log('Getting FB User Posts');
    const url = `${this.facebookURL}/feed`;
    return this.http.get<FacebookPosts>(url)
      .pipe(
        tap(_ => console.log('Got FB user posts'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

}
