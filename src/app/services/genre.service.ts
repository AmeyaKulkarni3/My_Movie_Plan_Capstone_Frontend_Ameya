import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap} from 'rxjs/operators'
import { Genre } from '../models/genre.model';
import { Message } from '../models/message.model';
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

  addGenre(genre : Genre){
    return this.http.post<Genre>(this.URL,genre)
    .pipe(catchError(this.errorService.handleError),
    tap(res => {
      this.fetchedGenres.push(res);
      this.genres.next(this.fetchedGenres);
    }));
  }

  updateGenre(genre : Genre){
    return this.http.put<Genre>(this.URL,genre)
    .pipe(catchError(this.errorService.handleError),
    tap(res => {
      let gr = this.fetchedGenres.find(g => g.id === genre.id);
      let index : number = this.fetchedGenres.indexOf(gr);
      this.fetchedGenres[index] = res;
      this.genres.next(this.fetchedGenres);
    }));
  }

  deleteGenre(genre : Genre){
    return this.http.delete<Message>(this.URL + `/${genre.id}`)
    .pipe(catchError(this.errorService.handleError),
    tap(res => {
      let gr = this.fetchedGenres.find(g => g.id === genre.id);
      let index : number = this.fetchedGenres.indexOf(gr);
      this.fetchedGenres.splice(index,1);
      this.genres.next(this.fetchedGenres);
    }));
  }


}
