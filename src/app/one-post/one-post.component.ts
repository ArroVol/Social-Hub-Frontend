import { Component, OnInit } from '@angular/core';
import {TwitterService} from '../service/twitter.service';
import {SecureTwitter} from '../model/twitter/SecureTwitter';
import {YoutubeService} from '../service/youtube.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Tweet} from '../model/twitter/Tweet';
import {ThemePalette} from '@angular/material/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {UserService} from '../service/user.service';
import {SimpleFormComponent} from '../simple-form/simple-form.component';
import {User} from '../model/user/User';
import {Observable} from 'rxjs';
import {ImageService} from '../service/image.service';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest} from '@angular/common/http';
import {NgxDropzoneChangeEvent} from 'ngx-dropzone';
import {FileUploader} from 'ng2-file-upload';
import {ObjectHolder} from '../model/Image/object-holder';
import {OnePostService} from '../service/one-posts/service';
import {OnePosts} from '../model/user/OnePosts';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import * as events from 'events';
import {Channel} from '../model/youtube/Channel';
import {Video} from '../model/youtube/Video';

const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json' });

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File,
              public snackBar: MatSnackBar,
              private storage: AngularFireStorage) {}
}
@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.css']
})
export class OnePostComponent implements OnInit {

  // selectedFile: ImageSnippet;
  private channel: Channel;

  constructor(private twitterService: TwitterService,
              private youtubeService: YoutubeService,
              private fb: FormBuilder,
              private userService: UserService,
              private imageService: ImageService,
              private http: HttpClient,
              private onePostService: OnePostService,
              public snackBar: MatSnackBar,
              private storage: AngularFireStorage,
              private firebase: AngularFireDatabase,
              public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      textInput: '',
      checkArray: this.fb.array([])
    });
  }

  // public uploader:FileUploader = new FileUploader({
  //   isHTML5: true
  // });
  atLeastOneFile = false;
  imageList: any[];
  rowIndexArray: any[];
  textContent: string;
  newTweet: Tweet;
  socialMedia = '';
  objectHolder: ObjectHolder;
  title = 'dropzone';
  selectedFiles: FileList;
  currentFileUpload: File;
  files: File[] = [];
  file: File;
  // private url = 'http://localhost:8080/api';
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  click = true;
  onePost: OnePosts;
  image: number[];
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private url = 'http://localhost:8080/api';

  event1: events;
  title2: string;
  body: string;
  checkBoxInput: string;
  textInput: string;
  userId: number;
  usersOnePosts: OnePosts[];
  twitterHandle: string;
  twitterSecureData: SecureTwitter;
  tweet: Tweet;
  twitterDeveloperMode: boolean;
  form: FormGroup;
  totalNumCharacters: number;
  change: string;
  twitterUser: User;
  public imageSrc = 'https://image.freepik.com/free-icon/upload-arrow_318-26670.jpg';
  Data: Array<any> = [
    // {name: 'All', value: 'all'},
    {name: 'Twitter', value: 'twitter'},
    {name: 'Facebook', value: 'facebook'},
    {name: 'Instagram', value: 'instagram'},
    {name: 'Youtube', value: 'youtube'},
    // {name: 'Spotify', value: 'spotify'}

  ];
  checkBox: boolean;
  fileName = '';
  task: Task = {
    name: 'All',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Twitter', completed: false, color: 'accent'},
      {name: 'Facebook', completed: false, color: 'accent'},
      {name: 'Instagram', completed: false, color: 'accent'},
      {name: 'Youtube', completed: false, color: 'accent'},
      {name: 'Spotify', completed: false, color: 'accent'}

    ]
  };
  savedOnePost: OnePosts;

  uploadForm: FormGroup;
  imageDetailList: AngularFireList<any>;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  onePostData = ({
    userId: sessionStorage.getItem('userId'),
    textContent: '',
    socialMedia: '',
    imageUrl: ''
  });

  form2 = new FormGroup({
    userId: new FormControl(sessionStorage.getItem('userId')),
    textContent: new FormControl(''),
    socialMedia: new FormControl(''),
    imageUrl: new FormControl('')
  });


  allComplete = false;
  name = 'Angular';
  resetCheckBox = false;
  isChecked = false;

  openDialog() {
    this.youtubeService.getChannelInfo()
      .subscribe(channel => {
        this.channel = JSON.parse(channel.toString());
      });
    this.dialog.open(OnePostComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  uploadSubmit() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert('Each File should be less than 10 MB of size.');
        return;
      }
    }
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      console.log(fileItem.name);
      data.append('file', fileItem);
      data.append('fileSeq', 'seq' + j);
      data.append('dataType', this.uploadForm.controls.type.value);
      // this.uploadFile(data).subscribe(data => alert(data.message));
    }
    this.uploader.clearQueue();
  }

  //
  // uploadFile(data: FormData): Observable {
  //   return this.http.post('http://localhost:8080/upload', data);
  // }

  ngOnInit(): void {
    this.totalNumCharacters = 0;
    this.imageService.getImageDetailList();
    this.getFirebaseOnePosts();
    this.userId = +sessionStorage.getItem('userId');
    this.uploadForm = this.fb.group({
      document: [null, null],
      type: [null, Validators.compose([Validators.required])]
    });
    console.log(+sessionStorage.getItem('userId'));
    this.twitterDeveloperMode = true;
    this.twitterHandle = sessionStorage.getItem('twitterHandle');
    // this.checkIfTwitterDev();
    // this.checkTwitterRegistered();
    this.userService.getUserById(+sessionStorage.getItem('userId'))
      .subscribe(user => {
        this.twitterUser = user;
        console.log(this.twitterUser.userId);
        console.log(this.twitterUser.email);
        console.log(this.twitterUser.username);
        this.getUsersOnePosts(this.userId);
      });
  }


  // checkIfTwitterDev() {
  //   this.twitterService.checkTwitterRegistered(1)
  //     .subscribe(twitterSecure => {
  //       this.twitterSecureData = twitterSecure;
  //     });
  // }

  checkTwitterRegistered() {
    this.twitterService.getTwitterTokens()
      .subscribe(twitterSecure => {
        this.twitterSecureData = twitterSecure;
        console.log('this is the id...: ' + this.twitterSecureData.userId);
        if (this.twitterSecureData.userId === '0') {
          console.log('null twitter secure data');
        }
      });
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  toggleEditable(event) {
    if (event.target.checked) {
      // this.contentEditable = true;
      console.log(event);
    }
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    console.log(e);

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onDropHandler(object) {
    console.log('event ' + JSON.stringify(object));
    this.imageSrc = object.event.target.result;
  }


  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  onUpload(event) {
    console.log('ON UPLOAD!');
    // console.log(event);
    console.log(event.target.files[0]);
    console.log(this.selectedFile);
    this.files.push(...event.addedFiles);
    const url = `${this.url}/send-image`;

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.files[0]);


    // pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    // data.append('file', file);
    const newRequest = new HttpRequest('POST', url, uploadImageData, {
      reportProgress: true,
      responseType: 'text'
    });
    // return this.http.request(newRequest);
  }

  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.http.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }


  selectFile(event): void {
    console.log(event);
    if (event.target.files.length === 1) {
      const file = event.target.files[0];
      this.file = file;
      console.log(file);
    } else {
    }
    this.selectedFiles = event.target.files;
  }


  upload2(content: string): void {
    const url = `${this.url}/send-image`;

    this.currentFileUpload = this.file;
    console.log('attempting upload');
    const data: FormData = new FormData();
    data.append('file', this.file);
    // data.append('content', content);

    this.objectHolder = new ObjectHolder();
    this.objectHolder.formData = data;
    this.objectHolder.textContent = content;
    console.log(url);
    this.http.post(url, this.objectHolder, {observe: 'response'})
      .subscribe((response) => {
          console.log('we did it!');

        }
      );

  }

  contentEntered($event: Event) {
    console.log(event);
  }


  checkCheckBox($event: MouseEvent) {
    console.log('logging');
    console.log($event.type);

  }

  checkCheckBox2($event: MouseEvent, name) {
    console.log(name);
    var checkBox = document.getElementsByClassName('example-margin')[0];
    console.log(checkBox);
    checkBox.classList.toggle('pressed');
    checkBox.classList.toggle('clicked');
    checkBox.classList.toggle('checked');
    var button = document.getElementsByClassName('btn btn-success')[0];
    console.log(button);
    button.classList.toggle('clicked');
  }

  getUsersOnePosts(userId: number) {
    console.log('getting the users one posts....');
    this.onePostService.getUsersOnePosts(userId)
      .subscribe(onePosts => {
        this.usersOnePosts = onePosts;

        if (this.usersOnePosts !== null) {
          console.log(this.usersOnePosts.length);
          for (let i = 0; i < onePosts.length; i++) {
            console.log(onePosts[i]);
          }
        }
      });
    // const reader = new FileReader();
    // reader.onload = (e) => this.image = this.usersOnePosts[0].image;
    // reader.readAsDataURL(new Blob([data]));
  }

  async saveOnePost(textContent: string) {

    for (let i = 0; i < this.form.value.checkArray.length; i++) {
      console.log(this.form.value.checkArray[i]);
      this.socialMedia = this.socialMedia.concat(this.form.value.checkArray[i]);
      this.socialMedia = this.socialMedia.concat(' ');
    }
    console.log(this.socialMedia);
    this.currentFileUpload = this.file;

    console.log('attempting upload');


    const url = `${this.url}/one-posts/save/form-data/text-only`;


    const data: FormData = new FormData();
    data.append('file', this.file);
    data.append('textContent', textContent);
    data.append('socialMedia', this.socialMedia);
    data.append('userId', sessionStorage.getItem('userId'));

    this.onePost = new OnePosts();
    this.onePost.image = data;
    this.onePost.textContent = textContent;
    this.onePost.userId = +sessionStorage.getItem('userId');
    this.onePost.createdAt = new Date();
    data.append('createdAt', this.onePost.createdAt.toDateString());

    if (this.file !== undefined) {
      var filePath = `${sessionStorage.getItem('userId')}/images/${this.file.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      console.log(filePath);
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.file)
        .snapshotChanges().pipe(
        //finalize call back function called when the upload is complete
        finalize(async () => {
          fileRef.getDownloadURL()
            .subscribe(async (url) => {

              this.onePostData['imageUrl'] = url;
              this.onePostData['textContent'] = textContent;
              this.onePostData['socialMedia'] = this.socialMedia;
              this.onePostData['userId'] = sessionStorage.getItem('userId');

              this.imageService.insertImageDetails(this.onePostData);

              this.openSnackBar('Posted to your account');
              await this.delay(2500);
              // window.location.reload();
              this.form2['imageUrl'] = url;

            });
        })
      ).subscribe();
    } else {
      // this.onePostData['imageUrl'] = url;
      this.onePostData['textContent'] = textContent;
      this.onePostData['socialMedia'] = this.socialMedia;
      this.onePostData['userId'] = sessionStorage.getItem('userId');

      this.imageService.insertImageDetails(this.onePostData);
      this.openSnackBar('Posted to your account');
      await this.delay(3500);
      this.clearFields();
      // window.location.reload();
    }

  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);

    if (this.files.length !== 0) {
      console.log('its ture');
      this.atLeastOneFile = true;
      console.log(this.atLeastOneFile);

    }

    if (this.files[1] != null) {
      this.onRemove(this.files[0]);
      this.file = this.files[0];

    } else {
      const formData = new FormData();

      for (var i = 0; i < this.files.length; i++) {
        formData.append('file[]', this.files[i]);
      }
      this.file = this.files[0];
      const url = `${this.url}/send-image`;
    }


  }

  onRemove(event) {
    console.log('on remove..');
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    if (this.files.length !== 0) {
      this.atLeastOneFile = true;
    } else {
      this.atLeastOneFile = false;
    }
  }


  upload(content: string): void {

    this.youtubeService.getChannelInfo().subscribe(channel => {
      this.channel = JSON.parse(channel.toString());
    });
    for (let i = 0; i < this.channel.videos.length; i++) {
      console.log(this.channel.videos[0].videoId);
    }
    this.youtubeService.postComment(this.getVideoId(this.channel.videos[0].videoId), content);

    // if (content !== undefined){
    //   this.textContent = content;
    // }
    // console.log('in the upload method in one post.ts file..');
    // console.log('this is the content... ' + content);
    // const url = `${this.url}/send-image`;
    // if (this.file === undefined){
    //   console.log('its undefined!');
    //   this.newTweet = new Tweet();
    //   this.newTweet.tweetCreator = sessionStorage.getItem('twitterHandle');
    //   this.newTweet.tweetText = content;
    //   this.twitterService.postUserTweet(this.newTweet, +sessionStorage.getItem('userId'))
    //     .subscribe(tweet => {
    //       this.newTweet = tweet;
    //     });

    // }
    // else {
    //   this.currentFileUpload = this.file;
    //   console.log(this.currentFileUpload);
    //
    //   console.log('attempting upload (one.post.ts)');
    //   const data: FormData = new FormData();
    //   data.append('file', this.file);
    //   data.append('textContent', content);
    //
    //   this.http.post(url, data, {observe: 'response'})
    //     .subscribe((response) => {
    //         console.log('we did it!');
    //       }
    //     );
    // }
    // this.saveOnePost(content);
    // this.resetForm();
    // this.clearFields();
  }

  submitForm(value: string, tweetContent: string) {
    console.log('submit');

    console.log(this.form.value.checkArray.length);

    console.log(this.form.value.checkArray);
    console.log(this.form.value.checkArray[0]);

    for (let i = 0; i < this.form.value.checkArray.length; i++) {
      if (this.form.value.checkArray[i] === 'twitter') {
        console.log('twitter was checked...');
        console.log(value);
        console.log(tweetContent);
        this.postUserTweet(value, tweetContent);

      }
      if (this.form.value.checkArray[i] === 'youtube') {
        this.youtubeService.getChannelInfo().subscribe(channel => {
          this.channel = JSON.parse(channel.toString());
        });
        console.log('Youtube is wack');
        this.youtubeService.postComment(this.getVideoId(this.channel.videos[0].videoId), tweetContent);
      }
    }
  }

  /**
   * Posts the user tweets to their twitter. Make a call to the backend and then to the twitter API
   * @param value is the id for the user.
   * @param tweetContent is the content of the tweet.
   */
  postUserTweet(value: string, tweetContent: string) {
    // this.submitForm(value, tweetContent);
    console.log('in the post user tweet in the twitter ts');
    this.tweet = new Tweet();
    this.tweet.tweetCreator = 'socialhubclub';
    this.tweet.tweetText = tweetContent;
    this.twitterService.postUserTweet(this.tweet, 1)
      .subscribe(tweet => {
        this.tweet = tweet;
      });
    console.log('called the post user tweet');
    // console.log(this.followerCount);
  }

  postYoutubeComment(video: string, comment: string) {
    this.youtubeService.postComment(video, comment);
  }

  openSnackBar(status: string) {
    this.snackBar.open(status, 'close', {
      duration: 3500,
    });
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resetForm() {
    this.form.reset();

    this.form2.reset();

    this.form2.setValue({
      userId: '',
      textContent: '',
      imageUrl: '',
      socialMedia: ''
    });
  }


  getFirebaseOnePosts() {
    this.imageService.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => item.payload.val());
        console.log(this.imageList.length);
        this.imageList = this.imageList.reverse();

        // for (let i = 0; i < this.imageList.length; i++){
        //   console.log(this.imageList[i].userId);
        //   console.log(this.imageList[i].textContent);
        //
        // }
        this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 1)).keys());
        console.log('length of indexarray... ' + this.rowIndexArray.length);
      }
    );
  }

  clearFields() {
    console.log('clearing.....');
    this.textInput = ' ';
    this.onRemove(this.event1);
    // this.form2.reset();
    this.form.reset();
    this.form.get('checkArray').reset();

  }


  addPost(myForm: FormGroupDirective | NgForm) {
    console.log('in add...');

    myForm.resetForm();
    myForm.reset();
  }

  handleClear() {
    this.name = ' ';
  }

  reset() {
    console.log('resetting..');
    this.form.reset();
    this.onRemove(this.files[0]);
    this.resetCheckBox = false;
    this.isChecked = false;

  }

  pressedEvent($event: any) {
    this.totalNumCharacters = $event.length;
  }

  getVideoId(s): string {
    return s.substr(30);
  }
}
