import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../service/navbar.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  // constructor(private nav: NavbarService ) {}

  ngOnInit(): void {
    // this.nav.hide();
  }

}
