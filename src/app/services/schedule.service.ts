import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Schedule } from '../models/schedule.model';
import { Showtime } from '../models/showtime.model';
import { ErrorService } from './error.service';
import { MovieService } from './movie.service';
import { TheaterService } from './theater.service';
import { catchError, tap } from 'rxjs/operators';
import { AddSchedule } from '../models/add-schedule.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  schedules = new BehaviorSubject<Schedule[]>([]);
  fetchedSchedules: Schedule[] = [];

  showtimes = new BehaviorSubject<Showtime[]>([]);
  fetchedShowtimes: Showtime[] = [];

  private URL = 'http://localhost:8080/schedule';

  private URL_ST = 'http://localhost:8080/showtime';

  constructor(
    private http: HttpClient,
    private movieService: MovieService,
    private theaterService: TheaterService,
    private errorService: ErrorService
  ) {}

  getShowtimes() {
    return this.http
      .get<Showtime[]>(this.URL_ST)
      .pipe(catchError(this.errorService.handleError))
      .subscribe((res) => {
        this.fetchedShowtimes = res;
        this.showtimes.next(this.fetchedShowtimes);
      });
  }

  getSchedules() {
    return this.http
      .get<Schedule[]>(this.URL)
      .pipe(catchError(this.errorService.handleError))
      .subscribe((res) => {
        this.fetchedSchedules = res;
        this.schedules.next(this.fetchedSchedules);
      });
  }

  addSchedule(schedule: AddSchedule) {
    return this.http.post<Schedule[]>(this.URL, schedule).pipe(
      catchError(this.errorService.handleError),
      tap((res) => {
        if (this.fetchedSchedules.length === 0) {
          this.fetchedSchedules = res;
        } else {
          this.fetchedSchedules = [...this.fetchedSchedules, ...res];
        }
        this.schedules.next(this.fetchedSchedules);
      })
    );
  }

  addShowtime(showtime: Showtime) {
    return this.http.post<Showtime>(this.URL_ST, showtime).pipe(
      catchError(this.errorService.handleError),
      tap((res) => {
        this.fetchedShowtimes.push(res);
        this.showtimes.next(this.fetchedShowtimes);
      })
    );
  }

  deleteSchedule(schedule: Schedule) {
    return this.http.delete<Message>(this.URL + `/${schedule.id}`).pipe(
      catchError(this.errorService.handleError),
      tap((res) => {
        console.log(res);
        let sc = this.fetchedSchedules.find((s) => s.id === schedule.id);
        let index: number = this.fetchedSchedules.indexOf(sc);
        console.log(this.fetchedSchedules);
        this.fetchedSchedules.splice(index, 1);
        console.log(this.fetchedSchedules);
        this.schedules.next(this.fetchedSchedules);
      })
    );
  }
}
