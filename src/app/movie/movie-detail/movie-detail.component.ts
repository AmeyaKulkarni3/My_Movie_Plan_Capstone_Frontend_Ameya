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
  genres : string = "";
  languages : string = "";

  constructor() {}
  

  ngOnInit(): void {
    this.movie = this.schedules[0].movie;
    var gs = this.movie.genres;
    var ls = this.movie.languages;
    gs.forEach(g => {
      if(gs.indexOf(g) == gs.length-1){
        this.genres = this.genres + g.name;
      } else {
        this.genres = this.genres + g.name + ",";
      }
    });
    ls.forEach(l => {
      if(ls.indexOf(l) == ls.length-1){
        this.languages = this.languages + l.name;
      } else {
        this.languages = this.languages + l.name + ",";
      }
    });
  }

  ngOnDestroy(): void {
    this.schedules = [];
  }

}
