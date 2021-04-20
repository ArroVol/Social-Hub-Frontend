import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Goal} from "../model/user/Goal";
import {Moment} from "moment";
import {GoalService} from "../service/goal.service";
import {BriefStatus} from "../model/twitter/BriefStatus";
import {MatRadioChange} from "@angular/material/radio";
import * as moment from "moment";

@Component({
  selector: 'app-goal-modal',
  templateUrl: './goal-modal.component.html',
  styleUrls: ['./goal-modal.component.css']
})
export class GoalModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GoalModalComponent>,
              private goalService: GoalService) { }

  ngOnInit(): void {
    this.disabledInput = true;
    console.log('init GOALS');
    this.checkForGoals();
    this.followerCount = +sessionStorage.getItem('twitterFollowerCount');
  }
  list = [
    { "name": "Weekly", ID: "D1"},
    { "name": "Monthly", ID: "D2"}
  ]
  chosenItem = this.list[0].name;

  disabledInput: boolean;
  labelPosition: string;
  userGoal: Goal;
  radioChoice = 'Weekly';
  incrementor = 0;
  currentDate: Moment;
  endDate: Moment;
  endDateString: string;
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
  followerCount: number;
  briefStatus: BriefStatus;


  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

  sendGoals(){
    console.log('this is the goal num: ' + this.max);
    this.userGoal = new Goal();
    this.userGoal.goalMaxNumber = this.max;
    this.userGoal.goalType = this.radioChoice;
    this.userGoal.goalStartNumber = +sessionStorage.getItem('twitterFollowerCount');
    this.userGoal.goalEndNumber = this.followerCount + this.max;
    this.userGoal.totalTwitterFollowers = this.followerCount;
    this.userGoal.userId = +sessionStorage.getItem('userId');
    this.userGoal.startDate = new Date();
    this.goalService.setGoals(this.userGoal)
      .subscribe(goal => {
        this.userGoal = goal;
        if (this.userGoal !== null){
          this.goalSet = true;
        } else {
          console.log('null goals');
        }
        // console.log(this.briefStatus.createdAt);
      });
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  radioChange($event: MatRadioChange) {
    console.log($event.value);
    this.radioChoice = $event.value;
  }
  updateGoals() {
    this.goalSet = false;
  }

  checkForGoals() {
    console.log('checking for goals');
    this.goalService.getGoalByUserId(sessionStorage.getItem('userId'))
      .subscribe(goal => {
        this.userGoal = goal;
        if (this.userGoal !== null){
          this.goalSet = true;
          this.max = this.userGoal.goalMaxNumber;
          this.value = this.followerCount - this.userGoal.goalStartNumber;
          this.endDate = moment(this.userGoal.startDate);
          console.log(this.endDate.calendar() + '  : end date');
          this.endDate = this.endDate.add(7, 'days');
          console.log('finalend date: ' + this.endDate.format('YYYY-MM-DD'));
          this.endDateString = this.endDate.format('YYYY-MM-DD');

        } else {
          console.log('null goals');
        }
      });
  }
}
