import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../model/user/User';
import {MessageService} from '../message.service';
import {Tweet} from '../model/twitter/Tweet';

const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
/**
 * The user service class.
 */
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})

};
  // httpOptions = {
  //   headers: new HttpHeaders({'Content-Type': 'application/json'})
  //     .set('Content-Type', 'undefined')
  //     .set('Access-Control-Allow-Origin', '*')
  //     .set('Access-Control-Allow-Methods', 'POST')
  //     .set('Access-Control-Allow-Headers', 'Origin')
  //     .set('Access-Control-Allow-Credentials', 'true')
  // };


  private userUrl = 'http://localhost:8080/api';

  constructor(
    // private environment: Environment,
    private http: HttpClient,

    // private userUrl = 'http://localhost:8080/api/user',  // URL to web api
    private messageService: MessageService) {
  }
  /** GET user by username from the server */
  getUserByUsername(username: string): Observable<User> {
    console.log('in the get user by userna,e in the user service');
    console.log(username);
    const url = `${this.userUrl}/user/retrieve/${username}`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }
  checkUsernameExists(username: string): Observable<boolean> {
    console.log('checking if username exists');
    console.log(username);
    const url = `${this.userUrl}/user/get-username/${username}`;
    return this.http.get<boolean>(url)
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }
  checkEmailExists(email: string): Observable<boolean> {
    console.log('checking if email exists');
    console.log(email);
    const url = `${this.userUrl}/user/get-email/${email}`;
    return this.http.get<boolean>(url)
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** Post user to the backend the server */
  saveUser(user: User): Observable<User> {
    console.log('*********"=');
    console.log(user.username);
    console.log(user.email);
    console.log('id: ' + user.userId);
    user.userId = 1;
    const url = `${this.userUrl}/user/newUser`;
    return this.http.post<User>(url, JSON.stringify(user), {headers})
      .pipe(
        tap(_ => console.log('sent the user' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }

  // /** Post registration by id from the server */
  // postUserTweet(tweet: Tweet, id: number): Observable<Tweet> {
  //   const url = `${this.twitterUrl}/twitter/post`;
  //   console.log('in the twitter service post user tweet method');
  //   console.log(tweet.tweetText);
  //   return this.http.post<Tweet>(url, JSON.stringify(tweet), {headers})
  //     .pipe(
  //       tap(_ => console.log('sent the tweet' ))
  //       // catchError(() => observableThrowError('get registration by id error'))
  //     );
  // }


  /** GET user by id from the server */
  getUserById(id: number): Observable<User> {
    const url = `${this.userUrl}/user/${id}`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** GET user the user login (username, email) from the server */
  getUserByLogin(email: string, password: string): Observable<User> {
    console.log('in the get user');
    const url = `${this.userUrl}/user/retrieve/${email}/${password}`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => console.log('fetched user' ))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** Post the user to the server */
  postUser(user: User, studentId: number): Observable<User> {
    const url = `${this.userUrl}/user/newUser`;
    return this.http.post<User>(url, JSON.stringify(user), {headers})
      .pipe(
        tap(_ => console.log('sent the registration' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }

  /** GET all users from the database. */
  getAllUsers(): Observable<User> {
    console.log('getting all user in service.ts');
    const url = `${this.userUrl}/user`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** Post registration by id from the server */
  updateUser(user: User): Observable<User> {
    console.log('in the update address service method');
    const url = `${this.userUrl}/user/put`;
    console.log(url);
    return this.http.put<User>(url, JSON.stringify(user), {headers})
      .pipe(
        tap(_ => console.log('sent the registration' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }

  attemptUserSave(user: User) {
    console.log('contacting the backend')
    console.log(user.username);
    console.log(user.email);
    console.log('id: ' + user.userId);
    user.userId = 1;
    const url = `${this.userUrl}/user/saveUser`;
    return this.http.post<User>(url, JSON.stringify(user), {headers})
      .pipe(
        tap(_ => console.log('sent the user' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }
}
