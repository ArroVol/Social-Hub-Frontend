import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MessageService} from '../message.service';
import {SpotifyUser} from '../model/spotify/SpotifyUser';
import {SpotifyArtist} from '../model/spotify/SpotifyArtist';
import {tap} from 'rxjs/operators';
import {SpotifyTrack} from '../model/spotify/SpotifyTrack';
import {SpotifyPlaylist} from '../model/spotify/SpotifyPlaylist';

const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  httpOptions = {
    headers: headers
  };
  private spotifyUrl = 'http://localhost:8080/spotify';

  constructor(private http: HttpClient) {
  }

  getUserProfile(): Observable<SpotifyUser> {
    console.log('getting spotify user');
    const url = `${this.spotifyUrl}/userinfo`;
    return this.http.get<SpotifyUser>(url)
      .pipe(
        tap(_ => console.log('fetched spotify user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  getAuthorizationLink(): Observable<string> {
    /*    this.httpOptions = {
          headers: new HttpHeaders({'Content-Type':'text/plain'})
        };*/
    const httpOptionsText = {
      headers: new HttpHeaders({
        Accept: 'text/plain',
        'Content-Type': 'text/plain'
      }),
      responseType: 'text' as 'json'
    };
    console.log('getting spotify authorization');
    const url = `${this.spotifyUrl}/`;
    return this.http.get<string>(url, httpOptionsText)
      .pipe(
        tap(_ => console.log('fetched authorization link'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  getArtistQuery(artistName: string): Observable<SpotifyArtist[]> {
    console.log('querying Artist');
    const url = `${this.spotifyUrl}/search/artist/` + artistName;
    return this.http.get<SpotifyArtist[]>(url)
      .pipe(
        tap(_ => console.log('fetched spotify artist'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  getTrackQuery(trackName: string): Observable<SpotifyTrack[]> {
    console.log('querying Track');
    const url = `${this.spotifyUrl}/search/track/` + trackName;
    return this.http.get<SpotifyTrack[]>(url)
      .pipe(
        tap(_ => console.log('fetched spotify track'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }

  getUserPlaylist(): Observable<SpotifyPlaylist[]> {
    console.log('getting spotify user playlist');
    const url = `${this.spotifyUrl}/playlist`;
    return this.http.get<SpotifyPlaylist[]>(url)
      .pipe(
        tap(_ => console.log('fetched spotify user playlist'))
      );
  }


}
