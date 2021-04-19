import { Component, OnInit } from '@angular/core';
import {User} from '../model/user/User';
import {UserService} from '../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {SimpleFormComponent} from '../simple-form/simple-form.component';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {MatRadioChange} from '@angular/material/radio';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
// import { EmailAsteriskPipe } from './email-asterisk.pipe';
// MDB Angular Pro
import { ModalModule, ButtonsModule, WavesModule } from 'ng-uikit-pro-standard';
import {ModalComponent} from '../modal/modal.component';
import {ImageService} from '../service/image.service';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from '../app.component';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

//user-data.ts
export class UserData {
  constructor(
    // public primaryAddress: string,
    public email: string,
    public name: string,
    public phoneNumber: string,
    public password: string,
    s: string){}
}

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}

// class ImageService {
//   constructor(private http: Http) {}
//
//
//   public uploadImage(image: File): Observable<Response> {
//     const formData = new FormData();
//
//     formData.append('image', image);
//
//     return this.http.post('/api/v1/image-upload', formData);
//   }
// }

// @ts-ignore
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  title = 'dropzone';

  files: File[] = [];
  selectedImageFile = null;
  selectedFile: ImageSnippet;
  showHidePassword: boolean;
  showPassword: false;
  validatingForm: FormGroup;
  accountDetails = {username: '', email: '', phoneNumber: '', password: ''};
  modalDisplayed: boolean;
  loggedInBool: boolean;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  newUser: User;
  loggedIn: string;
  nameId: number;
  userId: number;
  parameterTaken: string;
  addressId: number;
  user: User;
  myForm: FormGroup;
  userModel = new UserData('', '', '', '', '');
  accountCreated: boolean;
  updatedUser: User;
  showHideDeveloper: boolean;


  matcher = new MyErrorStateMatcher();

  userEmails = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
  });

  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, public snackBar: MatSnackBar, private formBuilder: FormBuilder, public matDialog: MatDialog, private http: HttpClient, private imageService: ImageService, private appComponent: AppComponent) {
    this.loggedIn = sessionStorage.getItem('loggedIn');
    this.accountCreated = false;
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, {validator: this.checkPasswords});

  }

  ngOnInit(): void {
    console.log('onit');
    this.appComponent.checkLogin();
    // this.appComponent.login(true);
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
    this.loggedIn = sessionStorage.getItem('loggedIn');
    this.nameId = +sessionStorage.getItem('userId');
    // console.log(this.loggedIn.toString());
    this.userService.getUserByUsername(sessionStorage.getItem('username'))
      .subscribe(user => {
        console.log('getting the users username: ' + user.username);
        this.user = new User();
        this.user.username = user.username;
        this.user.email = user.email;
        this.user.password = user.password;
        this.user.phoneNumber = user.phoneNumber;
      });
  }

  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  showFrame() {
    console.log('showing modal...');
    this.modalDisplayed = true;
  }

  hideFrame() {
    this.modalDisplayed = false;
  }

  logOut() {
    this.loggedInBool = false;
    // this.user = null;
    sessionStorage.clear();
    window.location.reload();
  }

  // openSnackBar(status: string) {
  //   if (status === 'success') {
  //     this.snackBar.open('Account Created', 'close', {
  //       duration: 3200,
  //     });
  //   } else {
  //     this.snackBar.open('Account Creation Failed', 'close', {
  //       duration: 3200,
  //     });
  //   }
  // }
  openSnackBar(status: string) {
    this.snackBar.open(status, 'close', {
      duration: 3200,
    });
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async add(username: string, password: string, email: string, firstName: string, lastName: string, phoneNumber: string): Promise<void> {

    this.newUser = new User();
    this.newUser.email = email;
    this.newUser.password = password;
    this.newUser.username = username;
    this.newUser.phoneNumber = phoneNumber;
    // this.newUser.userId = 1;
    console.log(this.newUser.username);
    this.userService.saveUser(this.newUser)
      .subscribe(async newUser => {
        this.newUser = newUser;
        console.log(' the user details returned: ');
        console.log('user Id; ' + this.newUser.userId);
        console.log('username: ' + this.newUser.username);
        console.log('email: ' + this.newUser.email);
        console.log('phone number: ' + this.newUser.phoneNumber);
        if (this.newUser.username == '**') {
          console.log('two equals');
        }
        if (this.newUser.username === '**') {
          console.log('three equals');
        }
        if (this.newUser.username !== '**' && this.newUser.email !== '**' && this.newUser.phoneNumber !== '**') {
          console.log('saved a user ' + this.newUser.userId);
          console.log('userID: ' + this.newUser.userId);
          sessionStorage.setItem('username', this.newUser.username);
          sessionStorage.setItem('userId', this.newUser.userId.toString());
          sessionStorage.setItem('email', this.newUser.email);
          sessionStorage.setItem('loggedIn', String(this.loggedIn));


          this.openSnackBar('Account Created');
          this.accountCreated = true;
          await this.delay(1500);

          window.location.assign('/account-information');
          this.loggedIn = 'true';
          sessionStorage.setItem('loggedIn', 'true');
        } else {
          console.log('null user');
          console.log(this.newUser.username);
          console.log(this.newUser.email);
          console.log(this.newUser.phoneNumber);
          if (this.newUser.username === '**') {
            this.parameterTaken = 'Username';
          } else if (this.newUser.email === '**') {
            this.parameterTaken = 'Email';
          } else if (this.newUser.phoneNumber === '**') {
            this.parameterTaken = 'Phone Number';
          }
          this.openSnackBar('Account Creation Failed: ' + this.parameterTaken + ' Taken');

        }

        //   if (this.newUser.username !== null) {
        //     console.log('not a null user');
        //     sessionStorage.setItem('username', this.newUser.username);
        //     sessionStorage.setItem('userId', this.newUser.userId.toString());
        // } else {
        //     console.log('null user');
        //     console.log(this.newUser.username);
        //     console.log(this.newUser.email);
        //     console.log(this.newUser.phoneNumber);
        //   }
        //   if (this.newUser.username !== null || this.newUser.email !== null || this.newUser.phoneNumber !== null) {
        //     console.log('they arent null');
        //     window.location.assign('/twitter');
        //     this.openSnackBar('Account Created');
        //   } else {
        //     if (this.newUser.username == null) {
        //       this.parameterTaken = 'Username';
        //     } else if (this.newUser.phoneNumber == null) {
        //       this.parameterTaken = 'Phone Number';
        //     } else if (this.newUser.email == null) {
        //       this.parameterTaken = 'Email';
        //     }
        //     this.openSnackBar('Account Creation Failed: ' + this.parameterTaken + ' Taken');
        //   }
        //   //   console.log('failed!')
        //   //   this.parameterTaken = 'Username';
        //   //   this.openSnackBar('Account Creation Failed: Username Taken');
        //   // } else {
        //   //   this.openSnackBar('Account Created');
        //   // }
      });

    // this.id = sessionStorage.getItem(('studentId'));
    // this.userService.postUser(this.newUser, +this.newUser.studentId)
    //   .subscribe(newUser => {
    //     this.newUser = newUser;
    //   });
    // if(this.newUser == null){
    //   this.openSnackBar('fail');
    // } else {
    //   this.openSnackBar('success');
    // }
  }

  changeWindow() {
    window.location.assign('/twitter');
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  save(f: User, isValid: boolean) {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  async update(username: string, email: string, phoneNumber: string, password: string) {
    console.log('pressed update account');
    console.log(username);
    console.log(email);
    if (username !== '' || email !== '' || phoneNumber !== '' || password !== '') {
      console.log('one of these is not null');
    } else {
      this.openSnackBar('No Fields Entered: Account Not Updated');
    }
    console.log('current username: ' + this.user.username);
    this.updatedUser = new User();
    this.updatedUser.userId = +sessionStorage.getItem('userId');
    this.updatedUser.username = username;
    this.updatedUser.email = email;
    this.updatedUser.phoneNumber = phoneNumber;
    this.updatedUser.password = password;

    this.userService.updateUser(this.updatedUser)
      .subscribe(async user => {
        this.updatedUser = user;
        console.log(username);
        console.log(email);
        console.log(password);
        console.log(phoneNumber);
        sessionStorage.setItem('username', this.updatedUser.username);
        sessionStorage.setItem('userId', this.updatedUser.userId.toString());
        sessionStorage.setItem('email', this.updatedUser.email);
        this.loggedIn = 'true';
        sessionStorage.setItem('loggedIn', String(this.loggedIn));
        this.openSnackBar('Account Updated');
        await this.delay(2000);
        window.location.reload();
      });
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '550px';
    dialogConfig.width = '700px';
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }


  async signUp(username: string, password: string, email: string): Promise<void> {
    console.log('in the signup class');
    this.newUser = new User();
    this.newUser.email = email;
    this.newUser.password = password;
    this.newUser.username = username;
    // this.newUser.phoneNumber = phoneNumber;
    // this.newUser.userId = 1;
    console.log(this.newUser.username);
    this.userService.attemptUserSave(this.newUser)
      .subscribe(async newUser => {
        this.newUser = newUser;
        console.log(' the user details returned: ');
        console.log('user Id; ' + this.newUser.userId);
        console.log('username: ' + this.newUser.username);
        console.log('email: ' + this.newUser.email);
        // console.log('phone number: ' + this.newUser.phoneNumber);
        if (this.newUser.username == '**') {
          console.log('two equals');
        }
        if (this.newUser.username === '**') {
          console.log('three equals');
        }
        if (this.newUser.username !== '**' && this.newUser.email !== '**') {
          console.log('saved a user ' + this.newUser.userId);
          console.log('userID: ' + this.newUser.userId);
          sessionStorage.setItem('username', this.newUser.username);
          sessionStorage.setItem('userId', this.newUser.userId.toString());
          sessionStorage.setItem('email', this.newUser.email);
          sessionStorage.setItem('loggedIn', String(this.loggedIn));
          this.openSnackBar('Account Created');
          this.accountCreated = true;
          await this.delay(1500);
          // this.appComponent.login(true);


          window.location.assign('/account-information');
          this.loggedIn = 'true';
          sessionStorage.setItem('loggedIn', 'true');
        } else {
          console.log('null user');
          console.log(this.newUser.username);
          console.log(this.newUser.email);
          console.log(this.newUser.phoneNumber);
          if (this.newUser.username === '**') {
            this.parameterTaken = 'Username';
          } else if (this.newUser.email === '**') {
            this.parameterTaken = 'Email';
          } else if (this.newUser.phoneNumber === '**') {
            this.parameterTaken = 'Phone Number';
          }
          this.openSnackBar('Account Creation Failed: ' + this.parameterTaken + ' Taken');

        }

      });
  }

  updateWithoutPassword(username: string, email: string, phoneNumber: string) {

    console.log('pressed update account');
    console.log(username);
    console.log(email);
    if (username !== '' || email !== '' || phoneNumber !== '' || phoneNumber !== '') {
      console.log('one of these is not null');
    } else {
      this.openSnackBar('No Fields Entered: Account Not Updated');
    }
    console.log('current username: ' + this.user.username);
    this.updatedUser = new User();
    this.updatedUser.userId = +sessionStorage.getItem('userId');
    this.updatedUser.username = username;
    this.updatedUser.email = email;
    this.updatedUser.phoneNumber = phoneNumber;

    this.userService.updateUser(this.updatedUser)
      .subscribe(async user => {
        this.updatedUser = user;
        console.log(username);
        console.log(email);
        console.log(phoneNumber);
        sessionStorage.setItem('username', this.updatedUser.username);
        sessionStorage.setItem('userId', this.updatedUser.userId.toString());
        sessionStorage.setItem('email', this.updatedUser.email);
        this.loggedIn = 'true';
        sessionStorage.setItem('loggedIn', String(this.loggedIn));
        this.openSnackBar('Account Updated');
        await this.delay(2000);
        window.location.reload();
      });
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    // const file: File = imageInput.files[0];
    // const reader = new FileReader();
    //
    // reader.addEventListener('load', (event: any) => {
    //
    //   this.selectedFile = new ImageSnippet(event.target.result, file);
    //
    //   this.imageService.uploadImage(this.selectedFile.file).subscribe(
    //     (res) => {
    //
    //     },
    //     (err) => {
    //
    //     });
    // });
    //
    // reader.readAsDataURL(file);
  }

  onFileSelected(event: Event) {
    console.log(event);
    this.selectedImageFile = event.target;
    this.onUpload();

  }

  onUpload() {
    this.imageService.postProfilePicture(this.selectedImageFile)
      .subscribe(newUser => {
        this.newUser = newUser;
        console.log(' the user details returned: ');
        console.log('user Id; ' + this.newUser.userId);
        console.log('username: ' + this.newUser.username);
        console.log('email: ' + this.newUser.email);
      });
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i]);
    }

    this.http.post('http://localhost:8001/upload.php', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      });
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  pageBack() {
    window.location.assign('/account-information');
  }
}

