import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MessageService} from '../message.service';
import {Observable} from 'rxjs';
import {User} from '../model/user/User';
import {tap} from 'rxjs/operators';
import {Goal} from '../model/user/Goal';

const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
/**
 * The user service class.
 */
export class GoalService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private goalUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  /** GET user by username from the server */
  getGoalByUserId(userId: string): Observable<Goal> {
    console.log('in the get goals in the goals.service.ts');
    console.log(userId);
    const url = `${this.goalUrl}/goals/get-goals/${userId}`;
    return this.http.get<Goal>(url)
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }
  setGoals(goal: Goal): Observable<Goal> {
    console.log('in the get goals in the goals.service.ts');
    const url = `${this.goalUrl}/set-goals`;
    return this.http.post<Goal>(url, JSON.stringify(goal), {headers})
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }


  updateGoals(goal: Goal): Observable<Goal> {
    console.log('in the get goals in the goals.service.ts');
    const url = `${this.goalUrl}/update-goals`;
    return this.http.put<Goal>(url, JSON.stringify(goal), {headers})
      .pipe(
        tap(_ => console.log('fetched user'))
        // catchError(() => observableThrowError('get user by id error'))
      );
  }


}
