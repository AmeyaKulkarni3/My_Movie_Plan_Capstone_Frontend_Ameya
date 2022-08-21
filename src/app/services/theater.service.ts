import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { Theater } from '../models/theater.model';
import { Tier } from '../models/tier.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class TheaterService {
  theaters = new BehaviorSubject<Theater[]>([]);
  fetchedTheaters: Theater[];

  tiers = new BehaviorSubject<Tier[]>([]);
  fetchedTiers: Tier[];

  private URL: string = 'http://localhost:8080/theater';

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getTiers() {
    return this.http
      .get<Tier[]>(this.URL + '/tier')
      .pipe(
        catchError(this.errorService.handleError),
        tap((res) => {
          this.fetchedTiers = res;
          this.tiers.next(this.fetchedTiers);
        })
      )
      .subscribe();
  }

  getTheaters() {
    return this.http
      .get<Theater[]>(this.URL)
      .pipe(
        catchError(this.errorService.handleError),
        tap((res) => {
          this.fetchedTheaters = res;
          this.theaters.next(this.fetchedTheaters);
        })
      )
      .subscribe();
  }

  addTheater(theater: Theater) {
    return this.http
      .post<Theater>(this.URL, theater)
      .pipe(
        catchError(this.errorService.handleError),
        tap((res) => {
          this.fetchedTheaters.push(res);
          this.theaters.next(this.fetchedTheaters);
        })
      )
      .subscribe();
  }

  addTier(tier : Tier){
    return this.http.post<Tier>(this.URL + '/tier',tier)
      .pipe(catchError(this.errorService.handleError),
      tap(res => {
        this.fetchedTiers.push(res);
        this.tiers.next(this.fetchedTiers);
      })).subscribe();
  }

  updateTheater(theater : Theater){

    return this.http.put<Theater>(this.URL,theater)
    .pipe(catchError(this.errorService.handleError),
    tap(res => {
      let th : Theater = this.fetchedTheaters.find(t => t.id === theater.id ? t : null);
      let i : number = this.fetchedTheaters.indexOf(th);
      this.fetchedTheaters[i] = res;
      this.tiers.next(this.fetchedTiers);
    })).subscribe(response => {
      console.log(response);
    })
  }

  deleteTheater(theater : Theater){

    return this.http.delete<Message>(this.URL + `/${theater.id}`)
    .pipe(catchError(this.errorService.handleError),
    tap(res => {
      this.fetchedTheaters.splice(this.fetchedTheaters.indexOf(theater),1);
      this.theaters.next(this.fetchedTheaters)}));
    
  }
}
