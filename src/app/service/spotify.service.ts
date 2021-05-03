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
import {SpotifyPlaylistSnapshot} from "../model/spotify/SpotifyPlaylistSnapshot";

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

  getUserById(user_id: string): Observable<SpotifyUser> {
    const url = `${this.spotifyUrl}/get/user/id/` + user_id;
    return this.http.get<SpotifyUser>(url).pipe();
  }

  getUserProfilePromise(): Promise<SpotifyUser> {
    console.log('getting spotify user');
    const url = `${this.spotifyUrl}/userinfo`;
    return this.http.get<SpotifyUser>(url)
      .pipe(
        tap(_ => console.log('fetched spotify user promise'))
      ).toPromise();
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
    const url = `${this.spotifyUrl}/get/authorizationcode`;
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

  getUserPlaylist(): Observable<SpotifyPlaylistSnapshot[]> {
    console.log('getting spotify user playlist');
    const url = `${this.spotifyUrl}/get/user/current/playlist`;
    return this.http.get<SpotifyPlaylistSnapshot[]>(url)
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

  createPlaylist(playlist_name: string, playlist_description: string): Observable<SpotifyPlaylist> {
    const url = `${this.spotifyUrl}/playlist/create/` + playlist_name + '/' + playlist_description;
    // console.log(url);
    // console.log('method Called with parameters: ' + playlist_name + ' , ' + playlist_description);
    return this.http.post<SpotifyPlaylist>(url, null);
  }

  reOrderPlaylist(playlist_id: string, range_start: number, insert_before: number): Observable<SpotifyPlaylist> {
    const url = `${this.spotifyUrl}/playlist/reorder/` + playlist_id + '/' + range_start + '/' + insert_before;
    // console.log(url);
    // console.log(range_start + ' ' + insert_before);
    return this.http.put<SpotifyPlaylist>(url, null);
  }

  removeTrackFromPlaylist(playlist_id: string, track_uri: string): Observable<SpotifyTrack[]> {
    const url = `${this.spotifyUrl}/playlist/remove/track/` + playlist_id + '/' + track_uri;
    return this.http.put<SpotifyTrack[]>(url, null);
  }

  addTrackToPlaylist(playlist_id: string, track_uri: string): Observable<SpotifyTrack[]> {
    const url = `${this.spotifyUrl}/playlist/add/track/` + playlist_id + '/' + track_uri;
    return this.http.put<SpotifyTrack[]>(url, null);
  }

  getArtistById(artist_id: string): Observable<SpotifyArtist> {
    const url = `${this.spotifyUrl}/artist/id/` + artist_id;
    return this.http.get<SpotifyArtist>(url)
      .pipe(
        tap(_ => console.log('fetched spotify artist by id: ' + artist_id))
      );
  }

  getTrackById(track_id: string): Observable<SpotifyTrack> {
    const url = `${this.spotifyUrl}/get/track/id/` + track_id;
    return this.http.get<SpotifyTrack>(url)
      .pipe(
        tap(_ => console.log('fetched spotify track by id: ' + track_id))
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

  getUserFollowedTracksPromise(): Promise<SpotifyTrack[]> {
    const url = `${this.spotifyUrl}/user/get/follow/tracks/`;
    return this.http.get<SpotifyTrack[]>(url)
      .pipe().toPromise();
  }

  getUserFollowedArtists(): Observable<SpotifyArtist[]> {
    const url = `${this.spotifyUrl}/user/get/follow/artists/`;
    return this.http.get<SpotifyArtist[]>(url)
      .pipe(
        tap(_ => console.log('retrieved user followed artists'))
      );
  }

  getUserFollowedAlbums(): Observable<SpotifyAlbum[]> {
    const url = `${this.spotifyUrl}/user/get/follow/albums/`;
    return this.http.get<SpotifyAlbum[]>(url)
      .pipe(
        tap(_ => console.log('retrieved user followed albums'))
      );
  }

  followTrack(track_id: string): Observable<Boolean> {
    const url = `${this.spotifyUrl}/user/favourite/track/` + track_id;
    return this.http.put<Boolean>(url, null).pipe(tap(_ => console.log('followed track by id: ' + track_id)));
  }

  unfollowTrack(track_id: string): Observable<Boolean> {
    const url = `${this.spotifyUrl}/user/unfavourite/track/` + track_id;
    return this.http.put<Boolean>(url, null).pipe(tap(_ => console.log('unfollowed track by id: ' + track_id)));
  }

  checkFollowedTrackByPromise(track_id: string[]): Promise<Boolean[]> {
    const url = `${this.spotifyUrl}/user/check/favourite/track/` + track_id;
    return this.http.get<Boolean[]>(url).pipe(tap(_ => console.log('checked if track followed: ' + track_id))).toPromise();
  }

  checkFollowedTrack(track_id: string[]): Observable<Boolean[]> {
    const url = `${this.spotifyUrl}/user/check/favourite/track/` + track_id;
    return this.http.get<Boolean[]>(url).pipe(tap(_ => console.log('checked if track followed: ' + track_id)));
  }

  getRelatedArtists(artist_id: string): Observable<SpotifyArtist[]> {
    const url = `${this.spotifyUrl}/artist/related/` + artist_id;
    return this.http.get<SpotifyArtist[]>(url).pipe();
  }

  getNewReleases(): Observable<SpotifyAlbum[]> {
    const url = `${this.spotifyUrl}/get/top/albums`;
    return this.http.get<SpotifyAlbum[]>(url).pipe();
  }

  getUserTopTracks(): Observable<SpotifyTrack[]> {
    const url = `${this.spotifyUrl}/user/get/top/tracks`;
    return this.http.get<SpotifyTrack[]>(url).pipe();
  }

  getUserTopTracksPromise(): Promise<SpotifyTrack[]> {
    const url = `${this.spotifyUrl}/user/get/top/tracks`;
    return this.http.get<SpotifyTrack[]>(url).pipe().toPromise();
  }

  getUserRecentTracks(): Observable<SpotifyTrack[]> {
    const url = `${this.spotifyUrl}/user/get/recent/tracks`;
    return this.http.get<SpotifyTrack[]>(url).pipe();
  }

  getUserRecentTracksPromise(): Promise<SpotifyTrack[]> {
    const url = `${this.spotifyUrl}/user/get/recent/tracks`;
    return this.http.get<SpotifyTrack[]>(url).pipe().toPromise();
  }

  getFeaturedPlaylists(): Observable<SpotifyPlaylistSnapshot[]> {
    const url = `${this.spotifyUrl}/get/featured/playlists/`;
    return this.http.get<SpotifyPlaylistSnapshot[]>(url).pipe(
      tap(playlist => console.log('playlist_snapshot', playlist))
    );
  }

  getRecommendedTracks(track_ids: string): Observable<SpotifyTrack[]> {
    const url = `${this.spotifyUrl}/get/recommended/tracks/` + track_ids;
    return this.http.get<SpotifyTrack[]>(url).pipe();
  }

  getRecommendedTracksPromise(track_ids: string): Promise<SpotifyTrack[]> {
    const url = `${this.spotifyUrl}/get/recommended/tracks/` + track_ids;
    return this.http.get<SpotifyTrack[]>(url).pipe().toPromise();

  }


}
