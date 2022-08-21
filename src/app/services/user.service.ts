import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL: string = 'http://localhost:8080';

  fetchedUser = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) {}

  getUser(userId: string) {
    console.log(userId);
    return this.http.get<User>(this.URL + `/user/${userId}`).subscribe({
      next: (response) => {
        this.setUser(response);
      },
      error: (errorRes) => this.handleError,
    });
  }

  private handleError(errorRest: HttpErrorResponse) {
    let errorMessage = 'Error Occured!';
    return throwError(() => errorRest.error.error);
  }

  private setUser(user: User) {
    localStorage.setItem('fetchedUser', JSON.stringify(user));
    this.fetchedUser.next(user);
  }
}
