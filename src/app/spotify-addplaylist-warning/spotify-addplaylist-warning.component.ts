import {Component, Inject, OnInit} from '@angular/core';
import {SpotifyService} from "../service/spotify.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  accept: boolean;
}


@Component({
  selector: 'app-spotify-addplaylist-warning',
  templateUrl: './spotify-addplaylist-warning.component.html',
  styleUrls: ['./spotify-addplaylist-warning.component.css']
})
export class SpotifyAddplaylistWarningComponent implements OnInit {

  constructor(private spotifyService: SpotifyService, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<DialogData>) {
  }

  ngOnInit(): void {
  }

  accept() {
    this.data.accept = true;
    console.log('data', this.data);
    return this.dialogRef.close(this.data);
  }


}
