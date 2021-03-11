import {Component, Inject, OnInit} from '@angular/core';
import {SpotifyService} from "../service/spotify.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {SpotifyPlaylist} from "../model/spotify/SpotifyPlaylist";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-spotify-update-playlist',
  templateUrl: './spotify-update-playlist.component.html',
  styleUrls: ['./spotify-update-playlist.component.css']
})
export class SpotifyUpdatePlaylistComponent implements OnInit {

  updatePlaylistForm: FormGroup;
  spotifyPlaylist: SpotifyPlaylist;

  constructor(private spotifyService: SpotifyService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {

    this.updatePlaylistForm = new FormGroup({
      'playlist_description': new FormControl(null, null),
      'playlist_name': new FormControl(null, Validators.minLength(5))
    });

  }

  submitForm(playlist_id: string) {
    let playlist_description = this.updatePlaylistForm.value['playlist_description'];
    if (playlist_description === null) {
      playlist_description = "";
    }

    if (this.updatePlaylistForm.valid) {
      this.spotifyService.updatePlaylistDetails(playlist_id, this.updatePlaylistForm.value['playlist_name'], playlist_description).subscribe(data => {
        this.spotifyPlaylist = data;
      });
    }
    if (this.spotifyPlaylist == null) {
      return this.spotifyService.getPlaylistById(playlist_id).subscribe(playlist => {
        this.spotifyPlaylist = playlist;
        console.log(playlist);
      });
    } else {
      return this.spotifyPlaylist;
    }
  }

}
