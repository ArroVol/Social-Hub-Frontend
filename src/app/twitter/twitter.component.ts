import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TwitterService} from '../service/twitter.service';
import {Tweet} from '../model/twitter/Tweet';
import {Status} from 'tslint/lib/runner';
import {Observable} from 'rxjs';
import {BriefStatus} from '../model/twitter/BriefStatus';
import {MatSort} from '@angular/material/sort';
import {SimpleFormComponent} from '../simple-form/simple-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AppComponent} from '../app.component';
import {GoalService} from '../service/goal.service';
import {Goal} from '../model/user/Goal';
import {MatRadioChange} from '@angular/material/radio';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MatTabsModule} from '@angular/material/tabs';
import {ChangeDetectionStrategy} from '@angular/core';

// import moment from 'moment';
import {Moment} from 'moment';
import * as moment from 'moment';
import {Snackbar} from "@material-ui/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {GoalModalComponent} from "../goal-modal/goal-modal.component";

export class RankData {
  rank: string;
  name: string;
  followerCount: string;
}

export interface State {
  flag: string;
  name: string;
  population: string;
}
export interface User {
  name: string;
}
export class CdkVirtualScrollOverviewExample {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
}
@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TwitterComponent implements AfterViewInit, OnInit {

  myControl = new FormControl();
  options: User[] = [
    {name: 'Mary'},
    {name: 'Shelley'},
    {name: ''},
    {name: ''},
    {name: ''},
    {name: ''},
    {name: ''},
    {name: ''},

  ];
  showOtherDiv: boolean;
  showingUser: string;
  showMostFavorited: boolean;
  goalType: string;
  click = true;
  displayedColumns: string[] = ['rank', 'name', 'followerCount'];
  dataSource: MatTableDataSource<any>;
  rankingList: RankData[];
  showingOther: string;
  searchFriend = '';
  showOtherMostFavorited: boolean;
  fontStyleControl = new FormControl();
  fontStyleControlOther = new FormControl();

  fontStyle?: string;
  filteredOptions: Observable<User[]>;
  labelPosition: string;
  showRanking: boolean;
  otherNumFollowers: number;
  otherMostRetweeted: BriefStatus;
  otherMostFavorited: BriefStatus;
  userMostRetweeted: BriefStatus;
  userMostFavorited: BriefStatus;

  otherHandle: string;
  compareTwitter: boolean;
  showTimeline: boolean;
  timeline: Object;
  briefStatusList: BriefStatus[];
  otherBriefStatusList: BriefStatus[];
  friendsList: string[];
  twitterHandle: string;
  twitterHandleFound: boolean;
  loggedIntoTwitter: boolean;
  tweet: Tweet;
  briefStatus: BriefStatus;
  statusText: string;
  status: Status;
  followerCount: number;
  timelineList: Tweet[];
  reactiveForm: FormGroup;
  rankData: RankData;
  timelineList$: Observable<Tweet[]>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('handle') handle; // accessing the reference element


  listData: MatTableDataSource<any>;
  developerMode = false;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 10;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;
  goalSet: boolean;
  userGoal: Goal;
  radioChoice: string;
  incrementor = 0;
  currentDate: Moment;
  endDate: Moment;
  endDateString: string;


  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  constructor(private twitterService: TwitterService, private appComponent: AppComponent,
              private goalService: GoalService,
              private builder: FormBuilder,
              public snackBar: MatSnackBar,
              public matDialog: MatDialog) {
    // this.dataSource = this.friendsList;
  }





  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /**
   * On page open get the recent post from the user and the number of followers.
   */
  ngOnInit(): void {
    this.showingOther ='';
    this.showingUser = 'Most Retweeted Post';
    this.showOtherDiv = false;
    this.showMostFavorited = false;
    this.reactiveForm = this.builder.group({
      age: [null, Validators.required]
    });
    // this.rankData = new RankData();
    this.rankingList = new Array as RankData[];
    this.showingOther = 'Most Retweeted Post';
    this.currentDate = moment(Date.now());
    this.currentDate = this.currentDate.add(7, 'days');
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
    this.getFriendsList();
    this.appComponent.displaySideNav = true;
    console.log('twitter.ts onit..');
    // this.compareTwitter = false;
    this.otherBriefStatusList = null;
    this.twitterHandle = sessionStorage.getItem('twitterHandle');
    if (sessionStorage.getItem('twitterHandle') !== null) {
      this.loggedIntoTwitter = true;
    }
    this.twitterHandleFound = Boolean(sessionStorage.getItem('twitterHandleFound'));
    this.developerMode = Boolean(sessionStorage.getItem('developerModeEnabled'));


    this.twitterService.getNumFollowersByHandle(sessionStorage.getItem('twitterHandle'))
      .subscribe(followerCount => {
        this.followerCount = +followerCount;
        this.checkForGoals();
        this.getUserTimeline();
        sessionStorage.setItem('twitterFollowerCount', this.followerCount.toString());

      });
    this.dataSource = new MatTableDataSource<any>(this.timelineList);
    // Assign the paginator *after* dataSource is set
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }



  /**
   * Posts the user tweets to their twitter. Make a call to the backend and then to the twitter API
   * @param value is the id for the user.
   * @param tweetContent is the content of the tweet.
   */
  postUserTweet(value: string, tweetContent: string) {
    console.log('in the post user tweet in the twitter ts');
    this.tweet = new Tweet();
    this.tweet.tweetCreator = 'socialhubclub';
    this.tweet.tweetText = tweetContent;
    this.twitterService.postUserTweet(this.tweet, 1)
      .subscribe(tweet => {
        this.tweet = tweet;
      });
    console.log('called the post user tweet');
    console.log(this.followerCount);
  }


  /**
   * Gets the user tweets from the twitter API.
   * @param value is the id for the user.
   */
  getUserStatus(value: string) {
    this.twitterService.getUserStatus(+value)
      .subscribe(status => {
        this.status = status;
        console.log('status text: ' + this.statusText);
        console.log('called the front end method get statuts');
        console.log(this.status);
        console.log(status);
      });
  }


  /**
   * Gets the users status as a Tweet object.
   * @param value the id for the user.
   */
  getUserStatusAsTweet(value: string) {
    this.twitterService.getUserStatusAsTweet(+value)
      .subscribe(tweet => {
        this.tweet = tweet;
        console.log('status text: ' + this.tweet.tweetText);
      });

  }
  /**
   * Gets the users timeline.
   * @param value the id for the user.
   */
  getTimeline(value: string) {
    console.log('in the twitter componenet get timeline method');
    this.twitterService.getTimeline(+value)
      .subscribe(tweet => {
        this.timelineList = tweet;
        this.listData = new MatTableDataSource<any>(this.timelineList);
        this.listData.sort = this.sort;
        // this.listData.paginator = this.paginator;
        console.log(this.timelineList.length);
        // console.log('status text: ' + this.tweet.tweetText);
      });

  }

   getUserTimeline() {
    console.log('getting the users timeline...');
    this.twitterService.getUserTimeline(this.twitterHandle)
      .subscribe(timeline => {
        this.briefStatusList = timeline;
        console.log('the length  of the users timeline list: ' + this.briefStatusList.length);

        if(this.briefStatusList[0].favoriteCount != 0){
          this.userMostFavorited = this.briefStatusList[0];
          this.briefStatusList = this.briefStatusList.slice(1);
            if(this.briefStatusList[0].retweetCount != 0){
              this.userMostRetweeted = this.briefStatusList[0];
              this.briefStatusList = this.briefStatusList.slice(1);
            }
        } else if(this.briefStatusList[0].favoriteCount == 0 && this.briefStatusList[1].retweetCount != 0){
          this.userMostRetweeted = this.briefStatusList[1];
          this.briefStatusList = this.briefStatusList.splice(1, 1);
        }
      });
  }

  getUsersMostPopular() {
    // console.log('getting the users timeline...');
    // this.twitterService.getUserTimeline(this.twitterHandle)
    //   .subscribe(timeline => {
    //     this.briefStatusList = timeline;
    //     console.log('the length  of hte users timeline list: ' + this.briefStatusList.length);
    //     // this.briefStatusList = this.briefStatusList.slice(1);
    //
    //     for (let i = 0; i < this.briefStatusList.length; i++){
    //       console.log(this.briefStatusList[i].text);
    //     }
    //
    //   });
  }
  getOtherUserTimeline(otherTwitterHandle: string) {
    this.otherBriefStatusList = null;
    this.otherMostRetweeted = null;
    this.otherHandle = otherTwitterHandle;
    this.twitterService.getUserTimeline(otherTwitterHandle)
      .subscribe(otherTimeline => {
        this.otherBriefStatusList = otherTimeline;
        this.otherMostRetweeted = this.otherBriefStatusList[0];
        this.otherMostFavorited = this.otherBriefStatusList[1];
        if (this.otherMostRetweeted.retweetCount === 0){

        } else if (this.otherMostFavorited.favoriteCount === 0 && this.otherMostRetweeted.retweetCount > 0) {
          this.otherBriefStatusList = this.otherBriefStatusList.slice(1);
        } else {
        this.otherBriefStatusList = this.otherBriefStatusList.slice(2);
        }
       this.showOtherDiv = true;

        this.twitterService.getNumFollowersByHandle(otherTwitterHandle)
          .subscribe(otherNumFollowers => {
            this.otherNumFollowers = otherNumFollowers;
            console.log('other num followers: ' + this.otherNumFollowers);
          });

      });
  }

  checkForGoals() {
    this.goalService.getGoalByUserId(sessionStorage.getItem('userId'))
      .subscribe(goal => {
        this.userGoal = goal;
        if (this.userGoal !== null){
          this.goalSet = true;
          this.value = this.followerCount - this.userGoal.goalStartNumber;
          this.endDate = moment(this.userGoal.startDate);
          console.log(this.endDate.calendar() + '  : end date');
          this.endDate = this.endDate.add(7, 'days');
          console.log('finalend date: ' + this.endDate.format('YYYY-MM-DD'));
          this.endDateString = this.endDate.format('YYYY-MM-DD');

        }
      });
  }

  updateGoals() {
  this.goalSet = false;
}

  sendGoals(){
    this.userGoal = new Goal();
    this.userGoal.goalMaxNumber = this.max;
    this.userGoal.goalType = this.radioChoice;
    this.userGoal.goalStartNumber = this.followerCount;
    this.userGoal.goalEndNumber = this.followerCount + this.max;
    this.userGoal.totalTwitterFollowers = this.followerCount;
    this.userGoal.userId = +sessionStorage.getItem('userId');
    this.userGoal.startDate = new Date();
    this.goalService.setGoals(this.userGoal)
      .subscribe(goal => {
        this.userGoal = goal;
        if (this.userGoal !== null){
          this.goalSet = true;
        }
        console.log(this.briefStatus.createdAt);
      });
  }
  radioChange($event: MatRadioChange) {
    console.log($event.value);
    this.radioChoice = $event.value;
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getFriendsList() {
    console.log('getting friends list');
    console.log(sessionStorage.getItem('twitterHandle'));
    this.twitterService.getFriendsList(sessionStorage.getItem('twitterHandle'))
      .subscribe(friendsList => {
        this.friendsList = friendsList;
        this.friendsList = this.friendsList.reverse();
        if (friendsList !== null) {
        for (let i = 0; i < friendsList.length; i++){
          console.log(friendsList[i]);
          this.options[i].name = friendsList[i];
        }
        }
      });
  }

  changeOtherFavorited() {
    this.showOtherMostFavorited = true;
    this.showingOther = 'Most Favorited Post';
  }

  changeOtherRetweeted() {
    this.showOtherMostFavorited = false;
    this.showingOther = 'Most Retweeted Post';

  }

  changeUserFavorited() {
    this.showingUser = 'Most Favorited Post';
    this.showMostFavorited = true;
  }

  changeUserRetweeted() {
    this.showingUser = 'Most Retweeted Post';
    this.showMostFavorited = false;

  }

  onKey($event: KeyboardEvent) {
    // if value is not empty the set click to false otherwise true
    this.click = (event.target as HTMLInputElement).value === '' ? true : false;
    console.log(KeyboardEvent.length);
  }
  onButtonClick(){
    this.click = !this.click;
  }

  clearFields(value: string) {
   value = '';
   this.searchFriend = '';
   this.handle.nativeElement.value = '';
   this.otherBriefStatusList = null;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFriendsRankingList(){
    console.log('clicked');
    console.log(this.rankingList.length)
    if(this.rankingList.length === 0) {

    console.log('getting ranking list');
    this.twitterService.getRankingList(sessionStorage.getItem('twitterHandle'))
      .subscribe(rankingList => {
        this.rankingList = rankingList;
        this.rankingList = this.rankingList.reverse();
        if (rankingList !== null) {
          this.incrementor = 0;
          for (let i = 0; i < rankingList.length; i++){
            console.log(rankingList[i]);
            this.incrementor += 1;
            rankingList[i].rank = this.incrementor.toString();
          }
          this.dataSource = new MatTableDataSource<any>(this.rankingList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    } else {
      this.openSnackBar('No friends to display, Add friends on Twitter to get started!');
    }
  }
  checkDefault(type: any): boolean {

    if(this.goalType === type){
      return true;
    }
    return false;
  }

  openSnackBar(status: string) {
    this.snackBar.open(status, 'close', {
      duration: 2500,
    });
  }

  launchGoalModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'goal-modal-component';
    dialogConfig.height = '310px';
    dialogConfig.width = '610px';
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(GoalModalComponent, dialogConfig);
  }
  tabClick(tab) {
    console.log(tab);
    if (tab === 1 && this.rankingList.length === 0){
      console.log('the ranking list is null.. get the list');
      this.getFriendsRankingList();
    }
  }

}
