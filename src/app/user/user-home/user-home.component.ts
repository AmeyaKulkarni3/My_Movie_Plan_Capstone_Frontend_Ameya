import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { City } from 'src/app/models/city.model';
import { Genre } from 'src/app/models/genre.model';
import { Language } from 'src/app/models/language.model';
import { Movie } from 'src/app/models/movie.model';
import { Schedule } from 'src/app/models/schedule.model';
import { Theater } from 'src/app/models/theater.model';
import { MovieDetailComponent } from 'src/app/movie/movie-detail/movie-detail.component';
import { CityService } from 'src/app/services/city.service';
import { GenreService } from 'src/app/services/genre.service';
import { LanguageService } from 'src/app/services/language.service';
import { MovieService } from 'src/app/services/movie.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TheaterService } from 'src/app/services/theater.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  theaters: Theater[] = [];
  genres: Genre[] = [];
  languages: Language[] = [];

  genreClicked: boolean = false;
  languageClicked: boolean = false;

  theatersInCity: Theater[] = this.theaters.filter(
    (theater) => theater.city.id === this.activeCity.id
  );

  moviesInCity: Movie[] = [];
  filteredMovies: Movie[] = [];
  theaterSchedules: Schedule[] = [];
  movieSchedules: Schedule[] = [];

  movieSub: Subscription;
  theaterSub: Subscription;
  genreSub: Subscription;
  languageSub: Subscription;
  citySub : Subscription;

  modalRef: BsModalRef;

  activeCity: City;

  constructor(
    private movieService: MovieService,
    private modalService: BsModalService,
    private theaterService: TheaterService,
    private cityService: CityService,
    private genreService: GenreService,
    private languageService: LanguageService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {

    this.cityService.getCities();
    
    this.activeCity = JSON.parse(localStorage.getItem('activeCity'));
    console.log(this.activeCity);
    
    this.cityService.activeCity.subscribe((res) => {
      this.activeCity = res;
      this.moviesInCity = [];
      this.theatersInCity = []
      this.filterTheaters(this.theaters);
    });
    
    this.genreService.getGenres();
    this.genreSub = this.genreService.genres.subscribe({
      next: (response) => {
        this.genres = response;
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

    this.languageService.getLanguages();
    this.languageSub = this.languageService.languages.subscribe({
      next: (response) => {
        this.languages = response;
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
    this.movieSub = this.movieService.movies.subscribe({
      next: (response) => {
        this.movies = response;
        console.log(this.movies);
        this.movies.forEach((movie) => {
          this.movieService.dowloadImage(movie);
        });
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

    this.theaterService.getTheaters();
    this.theaterSub = this.theaterService.theaters.subscribe({
      next: (response) => {
        this.theaters = response;
        console.log(this.theaters);
        if(this.theatersInCity.length === 0){
          this.filterTheaters(this.theaters);
        }
        
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
  }

  filterTheaters(theaters:Theater[]) {
    console.log(theaters);
    console.log(this.activeCity);
    if(this.activeCity){
      theaters.forEach(t => {
        if(t.city.id === this.activeCity.id){
          this.theatersInCity.push(t)
        }
      });
      console.log(this.theatersInCity);
      this.theatersInCity.forEach((t) => {
        let schedules: Schedule[] = t.schedules;
        schedules.forEach((s) => {
          console.log(s);
          let movie: Movie = this.movies.find((m) => m.id === s.movie.id);
          console.log(movie);
          if (!this.moviesInCity.includes(movie)) {
            this.moviesInCity.push(movie);
          }
        });
      });
      console.log(this.theatersInCity);
      console.log(this.moviesInCity);
    }
    
  }

  onGenreClick(genre: Genre) {
    this.genreClicked = true;
    console.log(this.genreClicked);
    if (!this.genreClicked && !this.languageClicked) {
      this.moviesInCity.forEach((m) => {
        m.genres.forEach((g) => {
          if (g.name === genre.name) {
            if (!this.filteredMovies.includes(m)) {
              this.filteredMovies.push(m);
            }
          }
        });
      });
    } else {
      if (this.filteredMovies.length === 0) {
        this.moviesInCity.forEach((m) => {
          m.genres.forEach((g) => {
            if (g.name === genre.name) {
              if (!this.filteredMovies.includes(m)) {
                this.filteredMovies.push(m);
              }
            }
          });
        });
      } else {
        this.filteredMovies.forEach((m) => {
          m.genres.forEach((g) => {
            if (g.name === genre.name) {
              if (!this.filteredMovies.includes(m)) {
                this.filteredMovies.push(m);
              }
            }
          });
        });
      }
    }
  }

  onLanguageClick(language: Language) {
    this.languageClicked = true;
    console.log(this.languageClicked);
    if (!this.genreClicked && !this.languageClicked) {
      this.moviesInCity.forEach((m) => {
        m.languages.forEach((l) => {
          if (l.name === language.name) {
            if (!this.filteredMovies.includes(m)) {
              this.filteredMovies.push(m);
            }
          } 
        });
      });
    } else {
      if (this.filteredMovies.length === 0) {
        this.moviesInCity.forEach((m) => {
          m.languages.forEach((l) => {
            if (l.name === language.name) {
              if (!this.filteredMovies.includes(m)) {
                this.filteredMovies.push(m);
              }
            }
          });
        });
      } else {
        this.filteredMovies.forEach((m) => {
          m.languages.forEach((l) => {
            if (l.name === language.name) {
              if (!this.filteredMovies.includes(m)) {
                this.filteredMovies.push(m);
              }
            }
          });
        });
      }
    }
  }

  onRemoveFilters() {}

  onMovieSelect(movie : Movie){
    this.movieSchedules = [];
    this.theaterSchedules = [];
    this.theatersInCity.forEach(theater => {
      let schedules : Schedule[] = theater.schedules;
      schedules.forEach(sc => {
        sc.theater = theater;
        this.theaterSchedules.push(sc);
      });
    });
    this.theaterSchedules.forEach(ts => {
      if(ts.movie.id === movie.id){
        ts.movie.image = movie.image;
        this.movieSchedules.push(ts);
      }
    });
    const initialState = {
      schedules : this.movieSchedules,
    }
    console.log(initialState.schedules);
    console.log(this.movieSchedules);
    this.modalRef = this.modalService.show(MovieDetailComponent,{initialState});
  }

  ngOnDestroy(): void {
    this.movieSub.unsubscribe();
    this.theaterSub.unsubscribe();
    this.genreSub.unsubscribe();
    this.languageSub.unsubscribe();
  }
}
