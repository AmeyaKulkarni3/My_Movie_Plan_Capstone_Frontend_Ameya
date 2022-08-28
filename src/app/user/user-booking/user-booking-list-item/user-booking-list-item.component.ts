import { Component, Input, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-user-booking-list-item',
  templateUrl: './user-booking-list-item.component.html',
  styleUrls: ['./user-booking-list-item.component.css']
})
export class UserBookingListItemComponent implements OnInit {

  @Input() booking : Booking;

  movie : Movie;

  seatsString : string = "";

  constructor() { }

  ngOnInit(): void {

    this.movie = this.booking.schedule.movie;
    var seats = this.booking.seats;
    console.log(seats);
    seats.forEach(s => {
      if(seats.indexOf(s) === seats.length-1){
        this.seatsString = this.seatsString + s.seatNumber;
      } else {
        this.seatsString = this.seatsString + s.seatNumber + ",";
      }
    })

  }

}
