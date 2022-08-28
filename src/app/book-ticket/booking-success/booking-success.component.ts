import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent implements OnInit {

  user : User;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('fetchedUser'));
  }

}
