import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Language } from '../models/language.model';
import { Message } from '../models/message.model';
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

  addLanguage(language : Language){
    return this.http.post<Language>(this.URL,language)
    .pipe(catchError(this.errorService.handleError),
    tap(res => {
      this.fetchedLanguages.push(res);
      this.languages.next(this.fetchedLanguages);
    }));
  }

  updateLanguage(language : Language){
    return this.http.put<Language>(this.URL,language)
    .pipe(catchError(this.errorService.handleError),
    tap(res => {
      let lg = this.fetchedLanguages.find(l => l.id === language.id);
      let index : number = this.fetchedLanguages.indexOf(lg);
      this.fetchedLanguages[index] = res;
      this.languages.next(this.fetchedLanguages);
    }));
  }

  deleteLanguage(language : Language){
    return this.http.delete<Message>(this.URL + `/${language.id}`)
    .pipe(catchError(this.errorService.handleError),
    tap(res => {
      let lg = this.fetchedLanguages.find(l => l.id === language.id);
      let index : number = this.fetchedLanguages.indexOf(lg);
      this.fetchedLanguages.splice(index,1);
      this.languages.next(this.fetchedLanguages);
    }));
  }

}
