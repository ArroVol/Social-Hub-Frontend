import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  loggedIn: boolean;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  myForm: FormGroup;
  validatingForm: FormGroup;
  modalDisplayed: boolean;


  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private formBuilder: FormBuilder, public matDialog: MatDialog) { }

  ngOnInit(): void {


    if (sessionStorage.getItem('loggedIn') === 'true'){
      this.loggedIn = true;
    }
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, {validator: this.checkPasswords});
  }

  signUpStepper() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '550px';
    dialogConfig.width = '850px';
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }
}
