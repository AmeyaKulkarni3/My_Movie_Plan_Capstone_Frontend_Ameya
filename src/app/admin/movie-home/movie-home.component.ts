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

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.css'],
})
export class MovieHomeComponent implements OnInit, OnDestroy {
  genres: Genre[] = [];
  languages: Language[] = [];
  movies: Movie[] = [];

  isActive: boolean = false;

  genreIndex: number[] = [1];
  languageIndex: number[] = [1];

  genreSub : Subscription;
  languageSub : Subscription;
  movieSub : Subscription;

  genreTemp : Genre[];
  languageTemp : Language[];

  modalRef : BsModalRef

  constructor(
    private genreService: GenreService,
    private languageService: LanguageService,
    private movieService: MovieService,
    private modalService : BsModalService
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
    console.log(form);
    
  }

  onActivate() {}

  onUpdate(movie: Movie) {}

  onDelete(movie: Movie) {}

  onAddGenreIndex() {
    this.genreIndex.push(this.genreIndex[this.genreIndex.length + 1]);
  }

  onAddLanguageIndex() {
    this.languageIndex.push(this.languageIndex[this.languageIndex.length + 1]);
  }

  ngOnDestroy(): void {
    this.genreSub.unsubscribe();
    this.languageSub.unsubscribe();
    this.movieSub.unsubscribe();
  }
}
