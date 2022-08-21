import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies = new BehaviorSubject<Movie[]>([]);
  fetchedMovies: Movie[] = [];

  private URL = 'http://localhost:8080/movies';

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getMovies() {
    return this.http
      .get<Movie[]>(this.URL)
      .pipe(catchError(this.errorService.handleError))
      .subscribe((res) => {
        this.fetchedMovies = res;
        this.movies.next(this.fetchedMovies);
      });
  }
}
