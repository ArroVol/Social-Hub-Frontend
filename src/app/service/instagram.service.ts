
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MessageService} from '../message.service';

import {tap} from 'rxjs/operators';
import {InstagramUserInfo} from '../model/instagram/InstagramUserInfo';


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

   changeBio(bio: string) {
     console.log('changing bio');
     const url = `${this.instagramUrl}/bioChange`;
     return this.http.post<String>(url, bio)
       .pipe(
         tap(_ => console.log('sent Bio Change' ))
         // catchError(() => observableThrowError('get registration by id error'))
       );
   }
}
