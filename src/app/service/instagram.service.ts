
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MessageService} from '../message.service';

import {tap} from 'rxjs/operators';


const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});

@Injectable({
  providedIn: 'root'
})
export class InstagramService {


  httpOptions = {
    headers: headers
  };
  private instagramUrl = 'http://localhost:8080/api/user/';

  constructor(private http: HttpClient) {
  }
}
