import {Component, Input, OnInit, Pipe} from '@angular/core';
import { YoutubeService } from '../service/youtube.service';
import {Video} from '../model/youtube/Video';
import {Channel} from '../model/youtube/Channel';
import {YoutubeComponent} from '../youtube/youtube.component';

export interface Tile {
  cols: number;
  rows: number;
  videoArr: String[];
}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  isClicked = false;
  channel: Channel;
  constructor(private youtubeService: YoutubeService) {
  }

  ngOnInit(): void {
    this.getChannel();
  }

  clicked() {
    if (this.isClicked == false) {
      this.isClicked = true;
    } else {
      this.isClicked = false;
    }
  }

  getChannel() {
    this.youtubeService.getChannelInfo().subscribe(channel => {
      this.channel = JSON.parse(channel.toString());
    });
  }
}
