import {Component, Inject, OnInit} from '@angular/core';
import {SpotifyService} from '../service/spotify.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-spotify-create-playlist',
  templateUrl: './spotify-create-playlist.component.html',
  styleUrls: ['./spotify-create-playlist.component.css']
})
export class SpotifyCreatePlaylistComponent implements OnInit {
  // playlist_name: string;
  // playlist_description: string;
  createPlaylistForm: FormGroup;


  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    this.createPlaylistForm = new FormGroup({
      'playlist_description': new FormControl(null, null),
      'playlist_name': new FormControl(null, Validators.minLength(5))
      // the rest of inputs with the same approach
    });
  }


  submitForm() {
    if (this.createPlaylistForm.valid) {
      // window.location.href = 'http://localhost:8080/spotify/playlist/create/' + this.createPlaylistForm.value['playlist_name'] + '/' + this.createPlaylistForm.value['playlist_description'];
      this.spotifyService.createPlaylist(this.createPlaylistForm.value['playlist_name'], this.createPlaylistForm.value['playlist_description']).subscribe(data => {
      });

    }
  }
}
