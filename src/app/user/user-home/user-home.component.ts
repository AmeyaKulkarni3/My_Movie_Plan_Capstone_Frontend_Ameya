import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { scan, Subscription } from 'rxjs';
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
  searchString: string = '';
  schedules: Schedule[] = [];

  genreClicked: boolean = false;
  languageClicked: boolean = false;
  searchClicked: boolean = false;

  genreFilteredMovies : Movie[] = [];

  searchedMovies: Movie[] = [];

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
  citySub: Subscription;

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
    
    this.activeCity = JSON.parse(localStorage.getItem('activeCity'));

    this.genreService.getGenres();
    this.genreSub = this.genreService.genres.subscribe({
      next: (response) => {
        console.log("in genreSub");
        
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
        console.log("in languageSub");
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
        console.log("in movieSub");
        this.movies = response;
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

    this.movieService.searchString.subscribe({
      next: (res) => {
        this.searchString = res;
        console.log(this.searchString);
        this.searchClicked = !this.searchClicked;
        // this.searchMovies();
      },
    });

    this.theaterService.getTheaters();
    this.theaterSub = this.theaterService.theaters.subscribe({
      next: (response) => {
        console.log("in theaterSub");
        this.theaters = response;
        if (this.theatersInCity.length === 0) {
          this.filterTheaters();
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

    this.cityService.getCities();

    this.cityService.activeCity.subscribe((res) => {
      console.log("in citysub");
      this.activeCity = res;
      this.moviesInCity = [];
      this.theatersInCity = [];
      this.filterTheaters()

    // this.filterTheaters1();
    // this.getSchedules();
    // this.getMoviesInCity();
    // if (this.searchClicked) {
    //   this.searchMovies();
    // }
  });

}

  // filterTheaters1() {
  //   console.log('inside filter theaters');
  //   console.log(this.theaters);
  //   if (this.theatersInCity.length === 0) {
  //     this.theaters.forEach(t => {
  //       if(t.city.id === this.activeCity.id){
  //         this.theatersInCity.push(t);
  //       }
  //     });
  //   }
  //   console.log(this.theatersInCity);
  // }

  // getSchedules() {
  //   console.log('inside get schedules');
  //   if (this.schedules.length === 0) {
  //     this.theatersInCity.forEach((t) => {
  //       var scs = t.schedules;
  //       scs.forEach(sc => {
  //         if(!this.schedules.includes(sc)){
  //           this.schedules.push(sc)
  //         }
  //       })
  //     });
  //   }
  //   console.log(this.schedules);
  // }

  // getMoviesInCity() {
  //   console.log('inside get movies in city');
  //   if (this.moviesInCity.length === 0) {
  //     if (this.schedules.length !== 0) {
  //       this.schedules.forEach((s) => {
  //         var m = s.movie;
  //         console.log(m);
  //         if (!this.moviesInCity.includes(m)) {
  //           console.log(this.moviesInCity);
  //           this.moviesInCity.push(m);
  //         }
  //       });
  //     }
  //   }
  //   console.log(this.moviesInCity);
    
  // }

  // searchMovies() {
  //   console.log('inside search movies');
  //   this.moviesInCity.forEach((m) => {
  //     console.log(m);
  //     if (m.name.toLowerCase().includes(this.searchString.toLowerCase())) {
  //       console.log("name matched");
  //       this.searchedMovies.push(m);
  //     }
  //   });
  // }

  filterTheaters() {
    this.theatersInCity = [];
    if (this.activeCity) {
      this.theaters.forEach((t) => {
        if (t.city.id === this.activeCity.id) {
          if (!this.theatersInCity.includes(t)) {
            this.theatersInCity.push(t);
          }
        }
      });
      this.theatersInCity.forEach((t) => {
        let schedules: Schedule[] = t.schedules;
        schedules.forEach((s) => {
          let movie: Movie = this.movies.find((m) => m.id === s.movie.id);
          if (!this.moviesInCity.includes(movie)) {
            this.moviesInCity.push(movie);
          }
        });
      });
      if (this.searchString) {
        var searched = [];
        console.log(this.searchString);
        this.moviesInCity.forEach((m) => {
          if (m.name.toLowerCase().includes(this.searchString.toLowerCase())) {
            if (!searched.includes(m)) {
              searched.push(m);
            }
          }
        });
        console.log('Searched ' + searched);

        this.moviesInCity = [];
        this.moviesInCity = searched;
      }

      console.log(this.theatersInCity);
      console.log(this.moviesInCity);
    }
  }

  onGenreClick(genre: Genre) {
    var genreSelected : Genre;
    this.genres.forEach(g => {
      if(genre.id === g.id){
        g.isSelected = !g.isSelected;
        genreSelected = genre;
      }
    })
    console.log(genre.name);
    this.checkGenreClicked();
    if(this.genreClicked){
      if(this.genreFilteredMovies.length === 0){
        this.moviesInCity.forEach(mv => {
          var gens = mv.genres;
          gens.forEach(g => {
            if(g.name === genreSelected.name){
              if(!this.genreFilteredMovies.includes(mv)){
                this.genreFilteredMovies.push(mv);
              }
            }
          })
        })
      } else {
        var genreFilteredMovies2 : Movie[] = [];
        this.genreFilteredMovies.forEach(mv => {
          var gens = mv.genres;
          gens.forEach(g => {
            if(g.name === genreSelected.name){
              console.log(mv);
              if(!genreFilteredMovies2.includes(mv)){
                console.log(mv);
                genreFilteredMovies2.push(mv);
              }
            }
          })
          console.log(genreFilteredMovies2);
          
        })
        this.genreFilteredMovies = genreFilteredMovies2;
      }
    }
  }

  checkGenreClicked(){
    var flag = false;
    this.genres.forEach(g => {
      if(g.isSelected){
        flag = true;
      }
    });
    if(flag){
      this.genreClicked = true;
    } else {
      this.genreClicked = false;
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

  onMovieSelect(movie: Movie) {
    this.movieSchedules = [];
    this.theaterSchedules = [];
    this.theatersInCity.forEach((theater) => {
      let schedules: Schedule[] = theater.schedules;
      schedules.forEach((sc) => {
        sc.theater = theater;
        this.theaterSchedules.push(sc);
      });
    });
    this.theaterSchedules.forEach((ts) => {
      if (ts.movie.id === movie.id) {
        ts.movie.image = movie.image;
        this.movieSchedules.push(ts);
      }
    });
    const initialState = {
      schedules: this.movieSchedules,
    };
    console.log(initialState.schedules);
    console.log(this.movieSchedules);
    this.modalRef = this.modalService.show(MovieDetailComponent, {
      initialState,
    });
  }

  ngOnDestroy(): void {
    this.movieSub.unsubscribe();
    this.theaterSub.unsubscribe();
    this.genreSub.unsubscribe();
    this.languageSub.unsubscribe();
  }
}
