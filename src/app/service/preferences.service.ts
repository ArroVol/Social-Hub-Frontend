import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {Preferences} from '../model/user/Preferences';
import {User} from '../model/user/User';


const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
/**
 * The Preferences service class.
 */
export class PreferencesService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})

  };
  private url = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }
  /** GET user by username from the server */
  getPreferencesById(userId: string): Observable<Preferences> {
    console.log('****');
    console.log('in the preferences services method get preferences by id');
    console.log(userId);
    const url = `${this.url}/preferences/retrieve/${userId}`;
    return this.http.get<Preferences>(url)
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  /** Post Preferences to the backend the server */
  savePreferences(Preferences: Preferences): Observable<Preferences> {
    const url = `${this.url}/preferences/create`;
    return this.http.post<Preferences>(url, JSON.stringify(Preferences), {headers})
      .pipe(
        tap(_ => console.log('sent the Preferences' ))
      );
  }



  // /** GET Preferences by id from the server */
  // getPreferencesById(userId: number): Observable<Preferences> {
  //   const url = `${this.url}/Preferences/${userId}`;
  //   return this.http.get<Preferences>(url)
  //     .pipe(
  //       tap(_ => console.log('fetched Preferences'))
  //     );
  // }

  /** GET Preferences the Preferences login (Preferencesname, email) from the server */
  getPreferencesByLogin(email: string, password: string): Observable<Preferences> {
    console.log('in the get Preferences');
    const url = `${this.url}/Preferences/retrieve/${email}/${password}`;
    return this.http.get<Preferences>(url)
      .pipe(
        tap(_ => console.log('fetched Preferences' ))
        // catchError(() => observableThrowError('get Preferences by id error'))
      );
  }

  /** Post the Preferences to the server */
  updatePreferences(Preferences: Preferences, userId: number): Observable<Preferences> {
    const url = `${this.url}/preferences/update`;
    return this.http.put<Preferences>(url, JSON.stringify(Preferences), {headers})
      .pipe(
        tap(_ => console.log('sent the registration' ))
        // catchError(() => observableThrowError('get registration by id error'))
      );
  }



}
