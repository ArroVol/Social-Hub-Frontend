import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MessageService} from '../message.service';
import {SpotifyUser} from '../model/spotify/SpotifyUser';
import {SpotifyArtist} from '../model/spotify/SpotifyArtist';
import {tap} from 'rxjs/operators';
import {SpotifyTrack} from '../model/spotify/SpotifyTrack';
import {SpotifyPlaylist} from '../model/spotify/SpotifyPlaylist';
import {SpotifyAlbum} from '../model/spotify/SpotifyAlbum';

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

  getPlaylistById(playlist_id: string): Observable<SpotifyPlaylist> {
    console.log('getting spotify playlist by id: ' + playlist_id);
    const url = `${this.spotifyUrl}/playlist/` + playlist_id;
    return this.http.get<SpotifyPlaylist>(url)
      .pipe(
        tap(_ => console.log('fetched spotify playlist by id: ' + playlist_id))
      );
  }

  getAlbumById(album_id: string): Observable<SpotifyAlbum> {
    console.log('getting spotify album by id: ' + album_id);
    const url = `${this.spotifyUrl}/album/` + album_id;
    return this.http.get<SpotifyAlbum>(url)
      .pipe(
        tap(_ => console.log('fetched spotify album by id: ' + album_id))
      );
  }

  createPlaylist(playlist_name: string, playlist_description: string): Observable<any> {
    const url = `${this.spotifyUrl}/playlist/create/` + playlist_name + '/' + playlist_description;
    // console.log(url);
    // console.log('method Called with parameters: ' + playlist_name + ' , ' + playlist_description);
    return this.http.post<any>(url, null);
  }

  reOrderPlaylist(playlist_id: string, range_start: number, insert_before: number): Observable<any> {
    const url = `${this.spotifyUrl}/playlist/reorder/` + playlist_id + '/' + range_start + '/' + insert_before;
    // console.log(url);
    // console.log(range_start + ' ' + insert_before);
    return this.http.put<any>(url, null);
  }

  removeTrackFromPlaylist(playlist_id: string, track_uri: string): Observable<any> {
    const url = `${this.spotifyUrl}/playlist/remove/track/` + playlist_id + '/' + track_uri;
    return this.http.put<any>(url, null);
  }

}
