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

  getPlaylistByIdPromise(playlist_id: string): Promise<SpotifyPlaylist> {
    console.log('getting spotify playlist by id: ' + playlist_id);
    const url = `${this.spotifyUrl}/playlist/` + playlist_id;
    return this.http.get<SpotifyPlaylist>(url)
      .pipe(
        tap(_ => console.log('fetched spotify playlist by id: ' + playlist_id))
      ).toPromise();
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

  addTrackToPlaylist(playlist_id: string, track_uri: string): Observable<SpotifyPlaylist> {
    const url = `${this.spotifyUrl}/playlist/add/track/` + playlist_id + '/' + track_uri;
    return this.http.put<any>(url, null);
  }

  //DONE:
  // Create pipeline for update playlist, get artist by id, get albums of artist by id, and get tracks of artist by id
  // No modifications of the models
  // Create artist component


  // NEED TO DO:
  // Create update playlist Component -> modal follow the create playlist example

  // Create an html css, etc for the artist page:
  // Title: Artist image, name, popularity
  // Popularity: Top Tracks in table
  // Albums: All of em in a table

  // Future sprint: pop the albums in a carousel?

  getArtistById(artist_id: string): Observable<SpotifyArtist> {
    const url = `${this.spotifyUrl}/artist/id/` + artist_id;
    return this.http.get<SpotifyArtist>(url)
      .pipe(
        tap(_ => console.log('fetched spotify artist by id: ' + artist_id))
      );
  }

  getArtistTopTracks(artist_id: string): Observable<SpotifyTrack[]> {
    const url = `${this.spotifyUrl}/artist/tracks/` + artist_id;
    return this.http.get<SpotifyTrack[]>(url)
      .pipe(
        tap(_ => console.log('fetched spotify artist tracks by id: ' + artist_id))
      );
  }

  getArtistAlbums(artist_id: string): Observable<SpotifyAlbum[]> {
    const url = `${this.spotifyUrl}/artist/albums/` + artist_id;
    return this.http.get<SpotifyAlbum[]>(url)
      .pipe(
        tap(_ => console.log('fetched spotify artist albums by id: ' + artist_id))
      );
  }

  updatePlaylistDetails(playlist_id: string, playlist_name: string, playlist_description: string): Observable<SpotifyPlaylist> {
    const url = `${this.spotifyUrl}/playlist/update/` + playlist_id + '/' + encodeURIComponent(playlist_name) + '/' + encodeURIComponent(playlist_description);
    console.log(url);
    return this.http.put<any>(url, null);
  }

  //TODO: Add methods to follow artist, check followed artists, and get saved tracks
  //TODO: Modify Artist page, Create saved tracks page

  followArtist(artist_id: string): Observable<Boolean> {
    const url = `${this.spotifyUrl}/artist/follow/` + artist_id;
    return this.http.put<any>(url, null)
      .pipe(
        tap(_ => console.log('followed artist by id: ' + artist_id))
      );
  }

  unfollowArtist(artist_id: string): Observable<Boolean> {
    const url = `${this.spotifyUrl}/artist/unfollow/` + artist_id;
    return this.http.put<any>(url, null)
      .pipe(
        tap(_ => console.log('unfollowed artist by id: ' + artist_id))
      );
  }

  checkFollowArtist(artist_id: string): Observable<Boolean> {
    const url = `${this.spotifyUrl}/artist/follow/contains/` + artist_id;
    return this.http.get<Boolean>(url)
      .pipe(
        tap(_ => console.log('checked artist by id: ' + artist_id))
      );
  }

  getUserFollowedTracks(): Observable<SpotifyTrack[]> {
    const url = `${this.spotifyUrl}/user/get/follow/tracks/`;
    return this.http.get<SpotifyTrack[]>(url)
      .pipe(
        tap(_ => console.log('retrieved user followed tracks'))
      );
  }


}
