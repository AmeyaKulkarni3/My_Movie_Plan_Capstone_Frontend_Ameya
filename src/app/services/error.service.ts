import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Error } from '../models/error.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  public handleLoginError(errorRest: HttpErrorResponse) {
    const recievedError = new Error();
    recievedError.code = errorRest.error.status;
    recievedError.message = errorRest.error.error;
    return throwError(() => recievedError);
  }

  public handleError(errorRest: HttpErrorResponse) {
    const recievedError = new Error();
    recievedError.code = errorRest.error.errorCode;
    recievedError.message = errorRest.error.message;
    return throwError(() => recievedError);
  }
}
