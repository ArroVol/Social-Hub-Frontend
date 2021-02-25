import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../model/user/User';
import {MessageService} from '../message.service';
import {Tweet} from '../model/twitter/Tweet';
import {Status} from 'tslint/lib/runner';
import {BriefStatus} from '../model/twitter/BriefStatus';

const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
/**
 * The class that makes call to the backend that controls twitter calls.
 */
export class TwitterService {
  studentId: number;
  httpOptions = {
    headers: headers
  };
  private twitterUrl = 'http://localhost:8080/api';

  constructor(
    // private environment: Environment,
    private http: HttpClient,

    // private twitterUrl = 'http://localhost:8080/api/user',  // URL to web api
    private messageService: MessageService) {
  }
  /** Post registration by id from the server */
  postUserTweet(tweet: Tweet, id: number): Observable<Tweet> {
    const url = `${this.twitterUrl}/twitter/post`;
    console.log('in the twitter service post user tweet method');
    console.log(tweet.tweetText);
    return this.http.post<Tweet>(url, JSON.stringify(tweet), {headers})
      .pipe(
        tap(_ => console.log('sent the tweet' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }


  /** GET num of followers by id from the server */
  getTimeline(id: number): Observable<Tweet[]> {
    console.log('getting the users timeline in the twitter service');

    // const url = `${this.twitterUrl}/user/${id}`;
    const url = `${this.twitterUrl}/twitter/full-timeline`;

    return this.http.get<Tweet[]>(url)
      .pipe(
        tap(_ => console.log('fetched timeline'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** GET num of followers by id from the server */
  getNumFollowersById(id: number): Observable<number> {
    console.log('in the get followers by id');

    // const url = `${this.twitterUrl}/user/${id}`;
    const url = `${this.twitterUrl}/twitter/followers`;

    return this.http.get<number>(url)
      .pipe(
        tap(_ => console.log('fetched follower count'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }
  /** GET num of followers by id from the server */
  getUserTweetsById(id: number): Observable<Tweet[]> {
    console.log('in the get followers by id');

    // const url = `${this.twitterUrl}/user/${id}`;
    const url = `${this.twitterUrl}/twitter/get-tweets`;

    return this.http.get<Tweet[]>(url)
      .pipe(
        tap(_ => console.log('fetched users tweets'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }
  /** GET num of followers by id from the server */
  getUserStatus(id: number): Observable<Status> {
    console.log('getting the users status in the twitter service');

    // const url = `${this.twitterUrl}/user/${id}`;
    const url = `${this.twitterUrl}/twitter/status`;

    return this.http.get<Status>(url)
      .pipe(
        tap(_ => console.log('fetched users status'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** GET num of followers by id from the server */
  getRecentPost(id: number): Observable<BriefStatus> {
    console.log('getting the users status in the twitter service');

    // const url = `${this.twitterUrl}/user/${id}`;
    const url = `${this.twitterUrl}/twitter/brief-status`;

    return this.http.get<BriefStatus>(url)
      .pipe(
        tap(_ => console.log('fetched users brief status'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** GET the user's status as a tweet object */
  getUserStatusAsTweet(id: number): Observable<Tweet> {
    console.log('getting the users status in the twitter service');

    // const url = `${this.twitterUrl}/user/${id}`;
    const url = `${this.twitterUrl}/twitter/status-tweet`;

    return this.http.get<Tweet>(url)
      .pipe(
        tap(_ => console.log('fetched users status'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** GET user from the server */
  getUser(email: string, password: string): Observable<User> {
    console.log('in the get user');
    const url = `${this.twitterUrl}/user/retrieve/${email}/${password}`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => console.log('fetched user' ))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** Post the user to the service */
  postUser(user: User, studentId: number): Observable<User> {
    const url = `${this.twitterUrl}/user/newUser`;
    return this.http.post<User>(url, JSON.stringify(user), {headers})
      .pipe(
        tap(_ => console.log('sent the registration' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }

  /** GET user by id from the server */
  getAllUsers(): Observable<User> {
    console.log('getting all user in service.ts');
    const url = `${this.twitterUrl}/user`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

}
