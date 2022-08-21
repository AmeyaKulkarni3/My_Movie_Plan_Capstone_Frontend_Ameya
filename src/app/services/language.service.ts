import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Language } from '../models/language.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  languages = new BehaviorSubject<Language[]>([]);
  fetchedLanguages : Language[] = [];

  private URL = "http://localhost:8080/language";

  constructor( private http:HttpClient, private errorService:ErrorService) { }

  getLanguages(){
    return this.http.get<Language[]>(this.URL)
      .pipe(catchError(this.errorService.handleError))
      .subscribe(res => {
        this.fetchedLanguages = res;
        this.languages.next(this.fetchedLanguages);
      });
  }

}
