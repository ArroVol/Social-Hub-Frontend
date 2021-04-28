import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ImageService} from "../service/image.service";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  url: string;
  imageList: any[];
  rowIndexArray: any[];
  form = new FormGroup({
    userId: new FormControl(''),
    category: new FormControl(''),
    imageUrl: new FormControl(''),
  })
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {

    // var bytes = [ 548745412154]; // get from server
    // var uints = new UInt8Array(bytes);
    // var base64 = btoa(String.fromCharCode(null, uints));
    this.url = 'data:image/jpeg;base64,' + "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // use this in <img src="..."> binding
    // var url = 'data:image/jpeg;base64,' + base64; // use this in <img src="..."> binding



    this.imageService.getImageDetailList();
    console.log('on images init...');
    this.imageService.imageDetailList.snapshotChanges().subscribe(
      list =>{
        this.imageList = list.map(item => {return item.payload.val();});
        console.log(this.imageList.length);
        for (let i = 0; i < this.imageList.length; i++){
          console.log(this.imageList[i].userId);
          console.log(this.imageList[i].textContent);

        }
        this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 1)).keys());
        console.log('length of indexarray... ' + this.rowIndexArray.length);
      }

    );
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
        // this.postUserTweet(value, tweetContent);
      }
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



}
