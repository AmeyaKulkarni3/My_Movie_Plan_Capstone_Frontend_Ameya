import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Booking } from 'src/app/models/booking.model';
import { Movie } from 'src/app/models/movie.model';
import { BookingService } from 'src/app/services/booking.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css'],
})
export class UserBookingComponent implements OnInit {
  bookings: Booking[];

  bookingSub: Subscription;

  movies: Movie[];

  constructor(
    private bookingService: BookingService,
    private modalService: BsModalService,
    private modalRef: BsModalRef,
    private movieService : MovieService
  ) {}

  ngOnInit(): void {
    this.bookingSub = this.bookingService.bookings.subscribe({
      next: (res) => {
        console.log(res);
        this.bookings = res;
      },
      error: (errorRes) => {
        const initialState = {
          errorRes,
        };
        this.modalRef = this.modalService.show(ErrorModalComponent, {
          initialState,
        });
      },
    });
    // this.movieService.getMovies();
    this.movieService.movies.subscribe({
      next : res => {
        this.movies = res;
      }
    });
    this.bookings.forEach(b => {
      var m = this.movies.find(mv => b.schedule.movie.id === mv.id);
      b.schedule.movie.image = m.image;
    })
  }

  onCancel() {
    this.modalRef.hide();
  }
}
