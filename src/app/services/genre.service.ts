import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap} from 'rxjs/operators'
import { Genre } from '../models/genre.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genres = new BehaviorSubject<Genre[]>([]);
  fetchedGenres : Genre[] = [];

  private URL = "http://localhost:8080/genre";

  constructor( private http:HttpClient, private errorService:ErrorService) { }

  getGenres(){
    return this.http.get<Genre[]>(this.URL)
      .pipe(catchError(this.errorService.handleError))
      .subscribe(res => {
        this.fetchedGenres = res;
        this.genres.next(this.fetchedGenres);
      });
  }
}
