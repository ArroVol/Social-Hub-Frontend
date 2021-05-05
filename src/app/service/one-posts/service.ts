import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../../model/user/User';
import {OnePosts} from '../../model/user/OnePosts';

const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
/**
 * The class that makes call to the backend that controls twitter calls.
 */
export class OnePostService {
  userId: number;
  twitterLoggedIn: boolean;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private onePostUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
  ) {

  }

  /** Post the user to the server */
  saveOnePosts(onePost: OnePosts): Observable<OnePosts> {
    const url = `${this.onePostUrl}/one-posts/save`;
    return this.http.post<OnePosts>(url, JSON.stringify(onePost), {headers})
      .pipe(
        tap(_ => console.log('sent the registration' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }

  /** Post the user to the server */
  sendOnePostsAsFormData(onePost: OnePosts): Observable<OnePosts> {
    const url = `${this.onePostUrl}/one-posts/save/form-data`;
    return this.http.post<OnePosts>(url, JSON.stringify(onePost), {headers})
      .pipe(
        tap(_ => console.log('sent the registration' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }


  /** GET all users from the database. */
  getUsersOnePosts(userId: number): Observable<OnePosts[]> {
    const url = `${this.onePostUrl}/one-posts/get/${userId}`;
    return this.http.get<OnePosts[]>(url)
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }


}
