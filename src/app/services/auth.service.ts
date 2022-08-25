import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggedInUser } from '../models/loggedin-user.model';
import { User } from '../models/user.model';
import { ErrorService } from './error.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<LoggedInUser | null>(null);

  private URL: string = 'http://localhost:8080';

  private tokenExpirationTimer: any;

  private tokenExpiration: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private errorService:ErrorService
  ) {}

  login(email: string, password: string) {
    return this.http
      .post(
        this.URL + '/login',
        {
          email: email,
          password: password,
        },
        { observe: 'response' }
      )
      .pipe(
        catchError(this.errorService.handleLoginError),
        tap((response) => {
          this.handleAuthentication(
            response.headers.get('UserId') || '',
            response.headers.get('Authorization') || '',
            response.headers.get('Roles') || ''
          );
        })
      );
  }

  signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string
  ) {
    return this.http
      .post(
        this.URL + '/register',
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          phone: phone,
        },
        { observe: 'response' }
      )
      .pipe(
        catchError(this.errorService.handleError)
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    localStorage.removeItem('fetchedUser');
    localStorage.removeItem('city');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: LoggedInUser = JSON.parse(
      localStorage.getItem('userData') || '{}'
    );
    if (!userData || userData === null) {
      return;
    }

    const fetchedUser: User = JSON.parse(localStorage.getItem('fetchedUser'));
    if (!fetchedUser || fetchedUser === null) {
      return;
    }
    const loggedInUser = new LoggedInUser(
      userData.userId,
      userData._token,
      userData.roles
    );

    if (loggedInUser._token) {
      this.user.next(loggedInUser);
    }

    if (fetchedUser.firstName) {
      this.userService.fetchedUser.next(fetchedUser);
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // private handleLoginError(errorRest: HttpErrorResponse) {
  //   const recievedError = new Error();
  //   recievedError.code = errorRest.error.status;
  //   recievedError.message = errorRest.error.error;
  //   return throwError(() => recievedError);
  // }

  // private handleError(errorRest: HttpErrorResponse) {
  //   const recievedError = new Error();
  //   recievedError.code = errorRest.error.errorCode;
  //   recievedError.message = errorRest.error.message;
  //   return throwError(() => recievedError);
  // }

  private handleAuthentication(userId: string, token: string, roles: string) {
    const user = new LoggedInUser(userId, token, roles);
    this.user.next(user);
    this.tokenExpiration = new Date().getTime() + 3600 * 1000;
    this.autoLogout(3600 * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
