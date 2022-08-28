import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookingConfirm } from '../models/booking-confirm.model';
import { Booking } from '../models/booking.model';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  bookings = new BehaviorSubject<Booking[]>([]);
  fetchedBookings: Booking[];

  booking = new BehaviorSubject<Booking>(null);
  fetchedBooking: Booking;

  private URL = 'http://localhost:8080/booking';

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  addBooking(bookingConfirm: BookingConfirm) {
    return this.http.post<Booking>(this.URL, bookingConfirm).pipe(
      catchError(this.errorService.handleError),
      tap((res) => {
        this.fetchedBooking = res;
        this.booking.next(this.fetchedBooking);
      })
    );
  }

  getUserBookings(userId: string) {
    const path = this.URL + `/${userId}`;
    return this.http
      .get<Booking[]>(path)
      .pipe(catchError(this.errorService.handleError))
      .subscribe((res) => {
        this.fetchedBookings = res;
        this.bookings.next(this.fetchedBookings);
      });
  }
}
