import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { Movie } from '../models/movie.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies = new BehaviorSubject<Movie[]>([]);
  fetchedMovies: Movie[] = [];

  image = new BehaviorSubject<any>({});
  fetchedImage: any[];

  searchString = new BehaviorSubject<string>("");

  private URL = 'http://localhost:8080/movie';

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getMovies() {
    return this.http
      .get<Movie[]>(this.URL + '/admin')
      .pipe(catchError(this.errorService.handleError))
      .subscribe((res) => {
        this.fetchedMovies = res;
        this.fetchedMovies.forEach((movie) => {
          this.dowloadImage(movie).subscribe({
            next: (response: Blob) => {
              console.log("Download Called");
              let reader = new FileReader();
              reader.addEventListener(
                'load',
                () => {
                  movie.image = reader.result;
                },
                false
              );
              if (res) {
                reader.readAsDataURL(response);
              }
            },
          });
        });
        this.movies.next(this.fetchedMovies);
      });
  }

  addMovie(movie: Movie) {
    return this.http.post<Movie>(this.URL, movie).pipe(
      catchError(this.errorService.handleError),
      tap((res) => {
        this.fetchedMovies.push(res);
        this.movies.next(this.fetchedMovies);
      })
    );
  }

  uploadImage(file: File, id: number) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<Message>(`http://localhost:8080/images/add-image/${id}`, formData)
      .pipe(
        catchError(this.errorService.handleError),
        tap((res) => {
          const mv = this.fetchedMovies.find((m) => m.id === id);
          const index = this.fetchedMovies.indexOf(mv);
          mv.poster = res.message;
          this.fetchedMovies[index] = mv;
          this.movies.next(this.fetchedMovies);
        })
      );
  }

  dowloadImage(movie: Movie) {
    let poster = movie.poster.substring(movie.poster.lastIndexOf('\\') + 1);
    return this.http
      .get('http://localhost:8080/images/download/' + `${poster}`, {
        responseType: 'blob',
      })
      .pipe(
        catchError(this.errorService.handleError),
        tap((res) => {
          this.image.next(res);
        })
      );
      // .subscribe();
  }

  updateStatus(id: number) {
    return this.http
      .put<Movie>(this.URL + `/change-status/${id}`, null)
      .pipe(
        catchError(this.errorService.handleError),
        tap((res) => {
          const mv = this.fetchedMovies.find((m) => m.id === id);
          const index = this.fetchedMovies.indexOf(mv);
          mv.active = res.active;
          this.fetchedMovies[index] = mv;
          this.movies.next(this.fetchedMovies);
        })
      )
      .subscribe();
  }

  updateMovie(movie: Movie) {
    return this.http.put<Movie>(this.URL, movie).pipe(
      catchError(this.errorService.handleError),
      tap((res) => {
        const index = this.fetchedMovies.indexOf(
          this.fetchedMovies.find((m) => m.id === movie.id)
        );
        this.fetchedMovies[index] = res;
        this.movies.next(this.fetchedMovies);
      })
    );
  }

  deleteMovie(movie: Movie) {
    return this.http.delete<Message>(this.URL + `/${movie.id}`).pipe(
      catchError(this.errorService.handleError),
      tap((res) => {
        this.fetchedMovies.splice(this.fetchedMovies.indexOf(movie), 1);
        this.movies.next(this.fetchedMovies);
      })
    );
  }

  updateSearchString(searchString : string){
    console.log(searchString);
    this.searchString.next(searchString);
  }
}
