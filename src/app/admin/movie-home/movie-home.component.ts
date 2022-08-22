import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Genre } from 'src/app/models/genre.model';
import { Language } from 'src/app/models/language.model';
import { Movie } from 'src/app/models/movie.model';
import { GenreService } from 'src/app/services/genre.service';
import { LanguageService } from 'src/app/services/language.service';
import { MovieService } from 'src/app/services/movie.service';
import { DeleteMovieComponent } from './delete-movie/delete-movie.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
import { UploadImageComponent } from './upload-image/upload-image.component';

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.css'],
})
export class MovieHomeComponent implements OnInit, OnDestroy {
  genres: Genre[] = [];
  languages: Language[] = [];
  movies: Movie[] = [];
  addMovie : boolean = false;

  genreSub: Subscription;
  languageSub: Subscription;
  movieSub: Subscription;
  addMovieSub : Subscription;

  genreTemp: Genre[];
  languageTemp: Language[];

  modalRef: BsModalRef;

  constructor(
    private genreService: GenreService,
    private languageService: LanguageService,
    private movieService: MovieService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.genreSub = this.genreService.genres.subscribe({
      next: (response) => {
        this.genres = response;
        this.genreTemp = this.genres.slice();
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
    this.languageSub = this.languageService.languages.subscribe({
      next: (response) => {
        this.languages = response;
        this.languageTemp = this.languages.slice();
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
    this.movieSub = this.movieService.movies.subscribe({
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
    this.genreService.getGenres();
    this.languageService.getLanguages();
    this.movieService.getMovies();
    
  }

  onSubmit(form: NgForm) {
    let genresToAdd : Genre[] = [];
    let genre1 = this.genres[+form.value.genre1-1];
    genresToAdd.push(genre1);
    let genre2 : Genre
    if(form.value.genre2){
      genre2 = this.genres[+form.value.genre2-1];
      genresToAdd.push(genre2);
    }
    let genre3 : Genre
    if(form.value.genre3){
      genre3 = this.genres[+form.value.genre3-1];
      genresToAdd.push(genre3);
    }
    let languagesToAdd : Language[] = [];
    let language1 = this.languages[+form.value.language1-1];
    languagesToAdd.push(language1);
    let language2 : Language
    if(form.value.language2){
      language2 = this.languages[+form.value.language2-1];
      languagesToAdd.push(language2);
    }
    let language3 : Language
    if(form.value.language3){
      language3 = this.languages[+form.value.language3-1];
      languagesToAdd.push(language3);
    }
    
    let movie = new Movie();
    movie.name = form.value.movieName;
    movie.directors = form.value.directors;
    movie.cast = form.value.cast;
    movie.duration = form.value.duration;
    movie.releaseDate = form.value.releaseDate;
    movie.genres = genresToAdd;
    movie.languages = languagesToAdd;

    this.addMovieSub = this.movieService.addMovie(movie).subscribe({
      error: (errorRes) => {
        const initialState = {
          errorRes,
        };
        this.modalRef = this.modalService.show(ErrorModalComponent, {
          initialState,
        });
      },
    })

    form.reset();
  }

  onActivate(id : number) {
    this.movieService.updateStatus(id)
  }

  onDeActivate(id : number) {
    this.movieService.updateStatus(id)
  }

  onUpdate(movie: Movie) {
    const initialState = {
      movie : movie
    };
    this.modalRef = this.modalService.show(UpdateMovieComponent,{initialState});
  }

  onDelete(movie: Movie) {
    const initialState = {
      movie: movie,
    };
    this.modalRef = this.modalService.show(DeleteMovieComponent, {
      initialState,
    });
  }

  onAddPoster(movie: Movie) {
    const initialState = {
      movie : movie
    };
    this.modalRef = this.modalService.show(UploadImageComponent,{initialState});
  }

  onAddMovie() {
    this.addMovie = !this.addMovie;
  }

  ngOnDestroy(): void {
    this.genreSub.unsubscribe();
    this.languageSub.unsubscribe();
    this.movieSub.unsubscribe();
    this.addMovieSub.unsubscribe();
  }
}
