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
export class UserService {
  studentId: number;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private userUrl = 'http://localhost:8080/api';

  constructor(
    // private environment: Environment,
    private http: HttpClient,

    // private userUrl = 'http://localhost:8080/api/user',  // URL to web api
    private messageService: MessageService) {
  }

  /** GET user by id from the server */
  getUserById(id: number): Observable<User> {
    const url = `${this.userUrl}/user/${id}`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** GET user by id from the server */
  getUser(email: string, password: string): Observable<User> {
    console.log('in the get user');
    const url = `${this.userUrl}/user/retrieve/${email}/${password}`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => console.log('fetched user' ))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** Post registration by id from the server */
  postUser(user: User, studentId: number): Observable<User> {
    const url = `${this.userUrl}/user/newUser`;
    return this.http.post<User>(url, JSON.stringify(user), {headers})
      .pipe(
        tap(_ => console.log('sent the registration' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }

  /** GET user by id from the server */
  getAllUsers(): Observable<User> {
    console.log('getting all user in service.ts');
    const url = `${this.userUrl}/user`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

}
