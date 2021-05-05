import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {SpotifyService} from "../service/spotify.service";
import {MatDialog} from "@angular/material/dialog";
import {MatAccordion} from "@angular/material/expansion";
import {SpotifyPlaylist} from "../model/spotify/SpotifyPlaylist";
import {SpotifyUser} from "../model/spotify/SpotifyUser";
import {SpotifyAlbum} from "../model/spotify/SpotifyAlbum";
import {SpotifyTrack} from "../model/spotify/SpotifyTrack";
import {SpotifyArtist} from "../model/spotify/SpotifyArtist";
import {SpotifyCreatePlaylistComponent} from "../spotify-create-playlist/spotify-create-playlist.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SpotifyAddplaylistSnackbarComponent} from "../spotify-addplaylist-snackbar/spotify-addplaylist-snackbar.component";
import {SpotifyAddplaylistWarningComponent} from "../spotify-addplaylist-warning/spotify-addplaylist-warning.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SpotifyPlaylistSnapshot} from "../model/spotify/SpotifyPlaylistSnapshot";

@Component({
  selector: 'app-spotify-artist',
  templateUrl: './spotify-artist.component.html',
  styleUrls: ['./spotify-artist.component.css']
})
export class SpotifyArtistComponent implements OnInit {

  @ViewChild(MatAccordion) artistAccordion: MatAccordion;
  spotifyUserPlaylist: SpotifyPlaylistSnapshot[];
  spotifyUser: SpotifyUser;
  spotifyArtist: SpotifyArtist;
  artistAlbums: SpotifyAlbum[];
  artistTopTracks: SpotifyTrack[];
  artistTopTracksFavourites: Boolean[];
  relatedArtists: SpotifyArtist[];

  isShown: boolean = true;
  tempSpotifyPlaylist: SpotifyPlaylist;
  followed: boolean;
  relatedArtistShowAll: boolean = false;
  discographyShowAll: boolean = false;


  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, public dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        let artist_id = this.route.snapshot.queryParamMap.get('id')
        this.getArtistById(artist_id);
        this.getArtistTopTracks(artist_id);
        this.getArtistAlbums(artist_id);
        this.getUserPlaylist();
        this.getUserProfile();
        this.checkFollowed(artist_id);
        this.getRelatedArtists(artist_id);
      }
    );
  }

  checkFollowed(artist_id: string) {
    this.spotifyService.checkFollowArtist(artist_id).subscribe(check => this.followed = check.valueOf());
  }

  getArtistTopTracks(artist_id: string) {
    this.spotifyService.getArtistTopTracks(artist_id).subscribe(async spotifyTracks => {
      this.artistTopTracks = spotifyTracks;
      console.log('spotifyTracks', spotifyTracks);
      await this.getFavouritedTracks(spotifyTracks.map(track => track.id));
    });

    // await this.getFavouritedTracks(this.artistTopTracks.);

  }

  getArtistById(artist_id: string) {
    this.spotifyService.getArtistById(artist_id).subscribe(spotifyArtist => {
      this.spotifyArtist = spotifyArtist;
    });
  }

  getArtistAlbums(artist_id: string) {
    this.spotifyService.getArtistAlbums(artist_id).subscribe(artistAlbums => {
      this.artistAlbums = artistAlbums;
    });
  }

  getUserPlaylist() {
    if (JSON.parse(sessionStorage.getItem("spotify_user_playlists"))) {
      this.spotifyUserPlaylist = JSON.parse(sessionStorage.getItem("spotify_user_playlists"));
    } else {
      this.spotifyService.getUserPlaylist().subscribe(spotifyUserPlaylist => {
        sessionStorage.setItem("spotify_user_playlists", JSON.stringify(spotifyUserPlaylist));
        this.spotifyUserPlaylist = spotifyUserPlaylist;
      });
    }
  }

  getUserProfile() {
    if (JSON.parse(sessionStorage.getItem("spotify_user"))) {
      this.spotifyUser = JSON.parse(sessionStorage.getItem("spotify_user"));
    } else {
      this.spotifyService.getUserProfile().subscribe(spotifyUser => {
        sessionStorage.setItem("spotify_user", JSON.stringify(spotifyUser));
        this.spotifyUser = spotifyUser;
      });
    }
  }

  routeToPlaylist(playlistId: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: playlistId
      }
    };
    this.router.navigate(['spotify/playlist'], navigationExtras);
  }

  routeToArtist(artist_id: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: artist_id
      }
    };
    this.router.navigate(['spotify/artist'], navigationExtras);
  }

  openCreatePlaylistDialog() {
    this.dialog.open(SpotifyCreatePlaylistComponent);
  }

  transform(input: string) {
    let minutes: string | number = Math.floor((parseInt(input) / (1000 * 60)) % 60);
    let seconds: string | number = Math.floor((parseInt(input) / 1000) % 60);
    let formatted_minutes = (minutes < 10) ? '0' + minutes : minutes;
    let formatted_seconds = (seconds < 10) ? '0' + seconds : seconds;
    return formatted_minutes + ':' + formatted_seconds;
  }

  async addToPlaylist(playlistId: string, track_uri: string) {
    let playlist = await this.findPlaylistById(playlistId);
    let spotifyTrackList = playlist.tracks;
    let check = await this.checkMatchingTrackUri(spotifyTrackList, track_uri);
    if (check) {
      this.openAddWarning(playlistId, track_uri);
    } else {
      this.spotifyService.addTrackToPlaylist(playlistId, track_uri).subscribe(result => {
        this._snackBar.openFromComponent(SpotifyAddplaylistSnackbarComponent, {
          duration: 3000,
        });
      });
    }
  }

  async findPlaylistById(playlist_id: string): Promise<SpotifyPlaylist> {
    return this.spotifyService.getPlaylistByIdPromise(playlist_id);
  }

  async checkMatchingTrackUri(spotifyTrackList: SpotifyTrack[], track_uri: string) {

    for (let track of spotifyTrackList) {
      if (track.spotifyUri === track_uri) {
        return true;
      }
    }
    return false;
  }

  openAddWarning(playlistId: string, track_uri: string) {
    this.dialog.open(SpotifyAddplaylistWarningComponent, {data: {accept: false}}).afterClosed().subscribe(value => {
      if (value.accept != null && value.accept == true) {
        this.spotifyService.addTrackToPlaylist(playlistId, track_uri).subscribe(result => {
          this._snackBar.openFromComponent(SpotifyAddplaylistSnackbarComponent, {
            duration: 3000,
          });

        });
      }
    })
  }

  followArtist() {
    this.spotifyService.followArtist(this.spotifyArtist.id).subscribe();
    this.followed = true;
    if (JSON.parse(sessionStorage.getItem("spotify_user_favourite_artists"))) {
      sessionStorage.setItem('spotify_user_favourite_artists', JSON.stringify([this.spotifyArtist].concat(JSON.parse(sessionStorage.getItem("spotify_user_favourite_artists")))));
    }
    this._snackBar.open(this.spotifyArtist.name + " has been followed!", '', {duration: 2000,});
  }

  unfollowArtist() {
    this.spotifyService.unfollowArtist(this.spotifyArtist.id).subscribe();
    this.followed = false;
    if (sessionStorage.getItem("spotify_user_favourite_artists") != null) {
      let favouriteArtists = JSON.parse(sessionStorage.getItem("spotify_user_favourite_artists"));
      favouriteArtists.forEach((artist, index) => {
        if (artist.id == this.spotifyArtist.id) {
          favouriteArtists.splice(index, 1);
        }
      });
      sessionStorage.setItem('spotify_user_favourite_artists', JSON.stringify(favouriteArtists));
    }
    this._snackBar.open(this.spotifyArtist.name + " has been unfollowed!", '', {duration: 2000,});
  }

  getRelatedArtists(artist_id: string) {
    console.log('Inside related Artists method');
    this.spotifyService.getRelatedArtists(artist_id).subscribe(result => this.relatedArtists = result);
  }

  async checkFollowedTrackByPromise(track_id: string[]) {
    return this.spotifyService.checkFollowedTrackByPromise(track_id);
  }

  async getFavouritedTracks(track_ids: string[]) {
    return this.spotifyService.checkFollowedTrack(track_ids).subscribe(result => console.log('favourited array', this.artistTopTracksFavourites = result));
  }

  followTrack(track_id: string) {
    this.spotifyService.followTrack(track_id).subscribe();
    this._snackBar.open('Song has been favourited!', '', {duration: 2000,});
  }

  unfollowTrack(track_id: string) {
    this.spotifyService.unfollowTrack(track_id).subscribe();
    this._snackBar.open('Song has been unfavourited!', '', {duration: 2000,});

  }

  hideloader() {
    this.isShown = false;
  }


}
