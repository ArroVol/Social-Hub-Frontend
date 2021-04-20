import {SpotifyAlbum} from './SpotifyAlbum';

export interface SpotifyTrack {
  id: string;
  name: string;
  artistInfo: Map<string, string>;
  spotifyUrl: string;
  diskNumber: string;
  duration: string;
  explicit: boolean;
  popularity: number;
  album: SpotifyAlbum;
  spotifyUri: string;
}
