import {SpotifyAlbum} from './SpotifyAlbum';

export class SpotifyTrack {
  name: string;
  artistNames: string[];
  spotifyUrl: string;
  diskNumber: string;
  duration: string;
  explicit: boolean;
  popularity: number;
  album: SpotifyAlbum;

  constructor() {
  }
}
