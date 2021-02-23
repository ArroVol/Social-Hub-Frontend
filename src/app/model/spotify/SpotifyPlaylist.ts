import {SpotifyTrack} from './SpotifyTrack';

export class SpotifyPlaylist {
  name: string;
  tracks: SpotifyTrack[];
  spotifyUrl: string;
  id: string;
  imageUrl: string;
  spotifyUri: string;

  constructor() {
  }
}
