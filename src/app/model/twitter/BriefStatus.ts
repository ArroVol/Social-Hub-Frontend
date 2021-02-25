/**
 * A class for only important variables from the status object from twitter.
 */
export class BriefStatus{
  createdAt: string;
  text: string;
  favoriteCount: number;
  retweetCount: number;
  screenName: string;
  handle: string;
  constructor() {
  }
}
