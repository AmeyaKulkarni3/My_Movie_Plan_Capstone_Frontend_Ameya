import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Movie } from 'src/app/models/movie.model';
import { Schedule } from 'src/app/models/schedule.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit,OnDestroy {

  schedules : Schedule[];

  movie : Movie;

  constructor() {}
  

  ngOnInit(): void {
    this.movie = this.schedules[0].movie;
  }

  ngOnDestroy(): void {
    this.schedules = [];
  }

}
