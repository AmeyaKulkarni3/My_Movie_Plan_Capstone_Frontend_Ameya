import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { AddSchedule } from 'src/app/models/add-schedule.model';
import { Movie } from 'src/app/models/movie.model';
import { Schedule } from 'src/app/models/schedule.model';
import { Showtime } from 'src/app/models/showtime.model';
import { Theater } from 'src/app/models/theater.model';
import { MovieService } from 'src/app/services/movie.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TheaterService } from 'src/app/services/theater.service';
import { AddShowtimeComponent } from './add-showtime/add-showtime.component';
import { DeleteScheduleComponent } from './delete-schedule/delete-schedule.component';

@Component({
  selector: 'app-schedule-home',
  templateUrl: './schedule-home.component.html',
  styleUrls: ['./schedule-home.component.css'],
})
export class ScheduleHomeComponent implements OnInit, OnDestroy {
  movies: Movie[];
  theaters: Theater[];
  showtimes: Showtime[];
  schedules : Schedule[];

  getMoviesSub: Subscription;
  getTheatersSub: Subscription;
  getShowtimesSub: Subscription;
  getScheduleSub: Subscription;
  addScheduleSub: Subscription;
  addShowtimeSub: Subscription;

  modalRef : BsModalRef;

  addShowtime : boolean = false;
  addSchedule : boolean = false;

  constructor(
    private movieService: MovieService,
    private theaterService: TheaterService,
    private scheduleService: ScheduleService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getMoviesSub = this.movieService.movies.subscribe({
      next: (response) => {
        this.movies = response;
      },
      error: (errorRes) => {
        const initialState = {
          errorRes,
        };
        this.modalRef = this.modalService.show(ErrorModalComponent, {
          initialState,
        });
      },
    });
    this.getTheatersSub = this.theaterService.theaters.subscribe({
      next: (response) => {
        this.theaters = response;
      },
      error: (errorRes) => {
        const initialState = {
          errorRes,
        };
        this.modalRef = this.modalService.show(ErrorModalComponent, {
          initialState,
        });
      },
    });
    this.getShowtimesSub = this.scheduleService.showtimes.subscribe({
      next: (response) => {
        this.showtimes = response;
      },
      error: (errorRes) => {
        const initialState = {
          errorRes,
        };
        this.modalRef = this.modalService.show(ErrorModalComponent, {
          initialState,
        });
      },
    });
    this.getScheduleSub = this.scheduleService.schedules.subscribe({
      next: (response) => {
        this.schedules = response;
      },
      error: (errorRes) => {
        const initialState = {
          errorRes,
        };
        this.modalRef = this.modalService.show(ErrorModalComponent, {
          initialState,
        });
      },
    });

    this.movieService.getMovies();
    this.theaterService.getTheaters();
    this.scheduleService.getShowtimes();
    this.scheduleService.getSchedules();
    
  }

  onAddSchedule(){
    this.addSchedule = !this.addSchedule;
  }

  onSubmit(form : NgForm){
    let schedule = new AddSchedule();
    schedule.movieId = form.value.movieId;
    schedule.theaterId = form.value.theaterId;
    schedule.showtimeId = form.value.showtimeId;
    schedule.date = form.value.fromDate;
    schedule.toDate = form.value.toDate;

    this.addScheduleSub = this.scheduleService.addSchedule(schedule).subscribe({
      error: (errorRes) => {
        const initialState = {
          errorRes,
        };
        this.modalRef = this.modalService.show(ErrorModalComponent, {
          initialState,
        });
      }
    })
  }

  onAddShowtime(){
    this.modalRef = this.modalService.show(AddShowtimeComponent);
  }

  onUpdate(schedule : Schedule){

  }

  onDelete(schedule : Schedule){
    const initialState = {
      schedule: schedule,
    };
    this.modalRef = this.modalService.show(DeleteScheduleComponent, {initialState});
  }

  ngOnDestroy(): void {
    this.getMoviesSub.unsubscribe();
    this.getTheatersSub.unsubscribe();
    this.getShowtimesSub.unsubscribe();
    this.getScheduleSub.unsubscribe();
    this.addScheduleSub.unsubscribe();
    this.addShowtimeSub.unsubscribe();
  }
}
