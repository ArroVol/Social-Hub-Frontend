import {Component, Inject, OnInit} from '@angular/core';
import {SpotifyService} from "../service/spotify.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {SpotifyPlaylist} from "../model/spotify/SpotifyPlaylist";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-spotify-update-playlist',
  templateUrl: './spotify-update-playlist.component.html',
  styleUrls: ['./spotify-update-playlist.component.css']
})
export class SpotifyUpdatePlaylistComponent implements OnInit {

  updatePlaylistForm: FormGroup;
  spotifyPlaylist: SpotifyPlaylist;

  constructor(private spotifyService: SpotifyService, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<DialogData>) {
    // spotifyService.getPlaylistById(data.id).subscribe(playlist => this.spotifyPlaylist = playlist);
  }

  ngOnInit(): void {

    this.updatePlaylistForm = new FormGroup({
      'playlist_description': new FormControl(null, null),
      'playlist_name': new FormControl(null, Validators.minLength(1))
    });

  }

  submitForm(playlist_id: string) {
    if (this.updatePlaylistForm.value['playlist_description'] == null) {
      this.updatePlaylistForm.value['playlist_description'] = "";
    }
    this.data.name = this.updatePlaylistForm.value['playlist_name'];
    this.data.description = this.updatePlaylistForm.value['playlist_description'];

    if (this.updatePlaylistForm.valid) {
      console.log('mat dialog', this.data);
      return this.dialogRef.close(this.data);
      // this.spotifyService.updatePlaylistDetails(playlist_id, this.updatePlaylistForm.value['playlist_name'], this.updatePlaylistForm.value['playlist_description']).subscribe(data => {
      //   console.log('data', data);
      //   this.spotifyPlaylist = data;
      // });
    } else {
      return null;
    }
    // console.log('mat dialog', this.data);
    // return this.dialogRef.close(this.data);
  }

}
