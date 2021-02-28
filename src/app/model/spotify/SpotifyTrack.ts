import {SpotifyAlbum} from './SpotifyAlbum';

export interface SpotifyTrack {
  id: string;
  name: string;
  artistNames: string[];
  spotifyUrl: string;
  diskNumber: string;
  duration: string;
  explicit: boolean;
  popularity: number;
  album: SpotifyAlbum;
  spotifyUri: string;
}
