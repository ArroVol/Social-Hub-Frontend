import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../model/user/User';
import {MessageService} from '../message.service';
import {Tweet} from '../model/twitter/Tweet';
import {Status} from 'tslint/lib/runner';
import {BriefStatus} from '../model/twitter/BriefStatus';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
/**
 * The class that makes call to the backend that controls twitter calls.
 */
export class YoutubeService {
  studentId: number;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private youtubeURL = 'http://localhost:8080/api';

  constructor(
    // private environment: Environment,
    private http: HttpClient,
    // private twitterUrl = 'http://localhost:8080/api/user',  // URL to web api
    private messageService: MessageService) {
  }


  getChannelId(): Observable<String> {
    console.log('getting all user in service.ts');
    const url = `${this.youtubeURL}/youtube/channelId`;
    return this.http.get(url, {responseType: 'text'})
      .pipe();
  }

  getVideos(): Observable<String[]> {
    const url = `${this.youtubeURL}/youtube/videos`;
    return this.http.get<String[]>(url).pipe();
  }

  getPlaylists(): Observable<String[]> {
    const url = `${this.youtubeURL}/youtube/playlists`;
    return this.http.get<String[]>(url).pipe();
  }

  getLikedVideos(): Observable<String[]> {
    const url = `${this.youtubeURL}/youtube/liked`;
    return this.http.get<String[]>(url).pipe();
  }
  getProfilePicture(): Observable<String> {
    const url = `${this.youtubeURL}/youtube/profilePic`;
    return this.http.get(url, {responseType: 'text'}).pipe();
  }
  getUsername(): Observable<String> {
    const url = `${this.youtubeURL}/youtube/username`;
    return this.http.get(url, {responseType: 'text'}).pipe();
  }

}



