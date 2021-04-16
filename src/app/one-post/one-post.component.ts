import { Component, OnInit } from '@angular/core';
import {TwitterService} from "../service/twitter.service";
import {SecureTwitter} from "../model/twitter/SecureTwitter";
import {Tweet} from "../model/twitter/Tweet";
import {ThemePalette} from '@angular/material/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import {UserService} from "../service/user.service";
import {SimpleFormComponent} from "../simple-form/simple-form.component";
import {User} from "../model/user/User";
import {Observable} from "rxjs";
import {ImageService} from "../service/image.service";
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest} from '@angular/common/http';
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {FileUploader} from "ng2-file-upload";
import {ObjectHolder} from "../model/Image/object-holder";
import {OnePostService} from "../service/one-posts/service";
import {OnePosts} from "../model/user/OnePosts";
import {MatSnackBar} from '@angular/material/snack-bar';


const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json' });

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File, public snackBar: MatSnackBar) {}
}
@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.css']
})
export class OnePostComponent implements OnInit {
  // public uploader:FileUploader = new FileUploader({
  //   isHTML5: true
  // });
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

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private url = 'http://localhost:8080/api';

  userId: number;
  usersOnePosts: OnePosts[];
  twitterHandle: string;
  twitterSecureData: SecureTwitter;
  tweet: Tweet;
  twitterDeveloperMode: boolean;
  form: FormGroup;
  twitterUser: User;
  public imageSrc = 'https://image.freepik.com/free-icon/upload-arrow_318-26670.jpg';
  Data: Array<any> = [
    // {name: 'All', value: 'all'},
    {name: 'Twitter', value: 'twitter'},
    {name: 'Facebook', value: 'facebook'},
    {name: 'Instagram', value: 'instagram'}
    // {name: 'Youtube', value: 'youtube'},
    // {name: 'Spotify', value: 'spotify'}

  ];
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

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  // selectedFile: ImageSnippet;
  constructor(private twitterService: TwitterService,
              private fb: FormBuilder,
              private userService: UserService,
              private imageService: ImageService,
              private http: HttpClient,
              private onePostService: OnePostService,
              public snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  uploadSubmit() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
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


  allComplete: boolean = false;

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

  socialCheckBox() {

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
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
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
    }
  }

  onDropHandler(object) {
    console.log("event " + JSON.stringify(object));
    this.imageSrc = object.event.target.result;
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[i]);
    }
    const url = `${this.url}/send-image`;

    this.http.post(url, formData, {observe: 'response'})
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
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
    uploadImageData.append("imageFile", this.files[0]);


    // pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    // data.append('file', file);
    const newRequest = new HttpRequest('POST', url, uploadImageData, {
      reportProgress: true,
      responseType: 'text'
    });
    // return this.http.request(newRequest);
  }



    // uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    //Make a call to the Spring Boot Application to save the image
  //   this.http.post(url, uploadImageData, { observe: 'response' })
  //     .subscribe((response) => {
  //       console.log('we did it!');
  //       // if (response.status === 200) {
  //       //   this.message = 'Image uploaded successfully';
  //       // } else {
  //       //   this.message = 'Image not uploaded successfully';
  //       // }
  //     }
  // );
  // }
  //
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

  onFileSelected(event) {

    const file:File = event.target.files[0];
    const url = `${this.url}/send-image`;
    console.log(url);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("imageFile", file);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);


        this.http.post(url, formData, { observe: 'response' })
          .subscribe((response) => {
            console.log('we did it!');
            // if (response.status === 200) {
            //   this.message = 'Image uploaded successfully';
            // } else {
            //   this.message = 'Image not uploaded successfully';
            // }
          }
      );
      // const newRequest = new HttpRequest('POST', url, formData, {
      //   reportProgress: true,
      //   responseType: 'text'
      // });

      // upload$.subscribe();
    }
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

  upload(content: string): void {
    const url = `${this.url}/send-image`;

    this.currentFileUpload = this.file;
    console.log('attempting upload');
    const data: FormData = new FormData();
    data.append('file', this.file);
    data.append('textContent', content);

    this.http.post(url, data, { observe: 'response' })
      .subscribe((response) => {
        console.log('we did it!');

      }
      );
    this.saveOnePost(content);
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
    this.http.post(url, this.objectHolder, { observe: 'response' })
      .subscribe((response) => {
          console.log('we did it!');

        }
      );

  }

  contentEntered($event: Event) {
    console.log(event);
  }

  onKey($event: KeyboardEvent) {
    // if value is not empty the set click to false otherwise true
    this.click = (event.target as HTMLInputElement).value === '' ? true : false;
  }

  checkCheckBox($event: MouseEvent) {
    console.log('logging');
    console.log($event.type);

  }

  checkCheckBox2($event: MouseEvent, name) {
    console.log(name);
    var checkBox = document.getElementsByClassName("example-margin")[0];
    console.log(checkBox);
    checkBox.classList.toggle("pressed");
    checkBox.classList.toggle("clicked");
    checkBox.classList.toggle("checked");
    var button = document.getElementsByClassName("btn btn-success")[0];
     button.classList.toggle("clicked");
  }

  getUsersOnePosts(userId: number) {
  console.log('getting the users one posts....')
    this.onePostService.getUsersOnePosts(userId)
      .subscribe(onePosts => {
        this.usersOnePosts = onePosts;

        if(this.usersOnePosts !== null) {
          console.log(this.usersOnePosts.length)
          for (let i = 0; i < onePosts.length; i++) {
            console.log(onePosts[i]);
          }
        }
    });
  }

  async saveOnePost(textContent: string){

    for (let i = 0; i < this.form.value.checkArray.length; i++) {
     console.log(this.form.value.checkArray[i]);
     this.socialMedia = this.socialMedia.concat(this.form.value.checkArray[i]);
     this.socialMedia = this.socialMedia.concat(' ');
    }
    console.log(this.socialMedia);
    this.currentFileUpload = this.file;
    console.log('attempting upload');
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



    // this.onePostService.saveOnePosts(this.onePost)
    //   .subscribe(onePost => {
    //     this.savedOnePost = onePost;
    //   });
    const url = `${this.url}/one-posts/save/form-data`;

    this.http.post(url, data, { observe: 'response' })
      .subscribe((response) => {
          console.log('we did it!');
          this.openSnackBar('Posted to your account')
          // this.snackBar.open('Posted to your account');
     this.delay(2500);
          window.location.reload();
        }
      );
  }

  openSnackBar(status: string) {
    this.snackBar.open(status, 'close', {
      duration: 2500,
    });
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
