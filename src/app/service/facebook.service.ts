import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FacebookUser} from '../model/facebook/FacebookUser';
import {FacebookPosts} from '../model/facebook/FacebookPosts';
import {FacebookPhotos} from '../model/facebook/FacebookPhotos';
import {FacebookLogin} from '../model/facebook/FacebookLogin';
import {FacebookPages} from '../model/facebook/FacebookPages';

const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json', 'Access-Control-Allow-Methods': 'GET, PUT, POST'});

@Injectable({
  providedIn: 'root'
})
export class FacebookService{
  httpOptions = {
    headers: headers
  };
  private facebookURL = 'http://localhost:8080/facebook';

  constructor(private http: HttpClient) {
  }

  login(): Observable<FacebookLogin>{
    console.log('Getting FB User');
    const url = `${this.facebookURL}/login`;
    return this.http.get<FacebookLogin>(url)
      .pipe(
        tap(_ => console.log('Got login'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  sendVerificationCode(code: string): Observable<string>{
    const body = JSON.stringify(code);
    const url = `${this.facebookURL}/verify`;
    //headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT')
    console.log('In facebook service, posting verification code');
    return this.http.post<string>(url, body, {headers})
      .pipe(
        tap(_ => console.log('sent code' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
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

  getPhotos(): Observable<FacebookPhotos>{
    console.log('Getting FB User Photos');
    const url = `${this.facebookURL}/photos`;
    return this.http.get<FacebookPhotos>(url)
      .pipe(
        tap(_ => console.log('Got FB user photos'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  getPages(): Observable<FacebookPages>{
    console.log('Getting FB Pages');
    const url = `${this.facebookURL}/accounts`;
    return this.http.get<FacebookPages>(url)
      .pipe(
        tap(_ => console.log('Got FB Pages'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

}