import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {InstagramService} from '../service/instagram.service';
import {InstagramUserInfo} from '../model/instagram/InstagramUserInfo';
import {InstagramComponent} from '../instagram/instagram.component';
import {InstagramUserSearchInfo} from '../model/instagram/InstagramUserSearchInfo';
import {MatDialog} from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  position: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen'},
  {position: 2, name: 'Helium'},
  {position: 3, name: 'Lithium'},
  {position: 4, name: 'Beryllium'},
  {position: 5, name: 'Boron'},
  {position: 6, name: 'Carbon'},
  {position: 7, name: 'Nitrogen'},
  {position: 8, name: 'Oxygen'},
  {position: 9, name: 'Fluorine'},
  {position: 10, name: 'Neon'},
];

@Component({
  selector: 'app-instagram-search',
  templateUrl: './instagram-search.component.html',
  styleUrls: ['./instagram-search.component.css']
})


export class InstagramSearchComponent implements OnInit  {

  constructor(private instagramService: InstagramService, public dialog: MatDialog,  ) {
  }
  public showChanges = false;
  public showSearch = false;
  public show = false;
  public buttonName: any = 'Show';
  displayedColumns: string[] = ['position', 'name'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  instagramUserSearch: InstagramUserSearchInfo;


  counter(i: number) {
    return new Array(i);
  }

  ngOnInit(): void {
  }

  userSearch(user: string){
    this.instagramService.getSearchInsta(user).subscribe(user => {
      this.instagramUserSearch = user;
      console.log('Get Search User Profile Called!');
      console.log(this.instagramUserSearch.displayName);
    });

    this.showSearch = !this.showSearch;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.showSearch) {
      this.buttonName = 'Hide';
    }
    else {
      this.buttonName = 'Change';
    }
  }

  getSearchImageUrl(pic: number): string{

    return this.instagramUserSearch.imageFeed[pic].toString().substring(
      this.instagramUserSearch.imageFeed[pic].toString().search('url') + 4,
      this.instagramUserSearch.imageFeed[pic].toString().search('width') - 2);
  }




}
