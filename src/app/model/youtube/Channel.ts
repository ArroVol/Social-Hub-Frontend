/**
 * The class object for Tweets.
 */
import {Video} from './Video';


export class Channel {
  channelId: string;
  profilePhoto: string;
  username: string;
  videos: Array<Video>;
  playlists: Array<string>;
  liked: Array<Video>;
  viewCount: string;
  subscriberCount: string;
  videoCount: string;

  constructor() {}
}
