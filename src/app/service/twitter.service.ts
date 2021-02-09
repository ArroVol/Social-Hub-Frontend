import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../model/user/User';
import {MessageService} from '../message.service';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  studentId: number;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private twitterUrl = 'http://localhost:8080/api';

  constructor(
    // private environment: Environment,
    private http: HttpClient,

    // private twitterUrl = 'http://localhost:8080/api/user',  // URL to web api
    private messageService: MessageService) {
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

  /** GET user by id from the server */
  getUser(email: string, password: string): Observable<User> {
    console.log('in the get user');
    const url = `${this.twitterUrl}/user/retrieve/${email}/${password}`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => console.log('fetched user' ))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** Post registration by id from the server */
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
