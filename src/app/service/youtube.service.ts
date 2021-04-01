import {Injectable} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../model/user/User';
import {MessageService} from '../message.service';
import {Tweet} from '../model/twitter/Tweet';
import {Status} from 'tslint/lib/runner';
import {BriefStatus} from '../model/twitter/BriefStatus';
import {Video} from '../model/youtube/Video';
import {Youtube} from '../model/youtube/Youtube';
import {Channel} from '../../../../../Downloads/Project/Social-Hub-Frontend/src/app/model/youtube/Channel';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
/**
 * The class that makes call to the backend that controls twitter calls.
 */
export class YoutubeService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private youtubeURL = 'http://localhost:8080/api';
  private channel: Observable<String>;
  constructor(
    // private environment: Environment,
    private http: HttpClient,
    // private twitterUrl = 'http://localhost:8080/api/user',  // URL to web api
    private messageService: MessageService) {
    this.channel = this.getChannelInfo();

  }

  postUser(youtube: Youtube): Subscription {
    const url = `${this.youtubeURL}/youtube/newUser`;
    console.log('Youtube' + youtube);
    return this.http.post(url, JSON.stringify(youtube), {headers}).subscribe(res =>
    {
      console.log(res);
    });

  }

  getUserByUsername(s: string): Observable<Youtube> {
    const url = `${this.youtubeURL}/youtube/retrieve/${s}`;
    return this.http.get<Youtube>(url)
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  getChannelInfo(): Observable<String> {
    if (this.channel == null) {
      console.log('channel is null');
      const url = `${this.youtubeURL}/youtube/channel`;
      return this.http.get(url, {responseType: 'text'}).pipe();
    }
    return this.channel;

  }

  // getVideos(): Observable<String[]> {
  //   const url = `${this.youtubeURL}/youtube/videos`;
  //   return this.http.get<String[]>(url).pipe();
  // }

  // getPlaylists(): Observable<String[]> {
  //   const url = `${this.youtubeURL}/youtube/playlists`;
  //   return this.http.get<String[]>(url).pipe();
  // }

  // getUser(): Observable<String[]> {
  //   const url = `${this.youtubeURL}/youtube/playlists`;
  //   return this.http.get<String[]>(url).pipe();
  // }

  // getLikedVideos(): Observable<String[]> {
  //   const url = `${this.youtubeURL}/youtube/liked`;
  //   return this.http.get<String[]>(url).pipe();
  // }

}



