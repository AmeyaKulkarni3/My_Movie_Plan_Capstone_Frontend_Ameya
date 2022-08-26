import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BookingConfirm } from '../models/booking-confirm.model';
import { Schedule } from '../models/schedule.model';
import { Seat } from '../models/seat.model';
import { Tier } from '../models/tier.model';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css'],
})
export class BookTicketComponent implements OnInit {
  selectedSchedule: Schedule;

  seats: Seat[];
  tiers: Tier[];
  tier1: Seat[][] = [];
  tier2: Seat[][] = [];
  tier3: Seat[][] = [];
  selectedSeats: Seat[] = [];
  selecteSeatsString: string = '';
  totalPrice:number = 0;

  newModalRef : BsModalRef;

  constructor(private modalRef: BsModalRef, private modalServie:BsModalService) {}

  ngOnInit(): void {
    this.seats = this.selectedSchedule.seats;
    this.tiers = this.selectedSchedule.theater.tiers;
    this.seats.forEach((seat) => {
      this.tiers.forEach((tier) => {
        if (seat.tier.id === tier.id) {
          if (tier.seats === null) {
            tier.seats = [];
            tier.seats.push(seat);
          } else {
            tier.seats.push(seat);
          }
        }
      });
    });
    var k = 0;
    for (var i = 0; i < this.tiers[0].rows; i++) {
      this.tier1[i] = [];
      for (var j = 0; j < this.tiers[0].cols; j++) {
        this.tier1[i][j] = this.tiers[0].seats[k];
        k++;
      }
    }
    k = 0;
    for (var i = 0; i < this.tiers[1].rows; i++) {
      this.tier2[i] = [];
      for (var j = 0; j < this.tiers[1].cols; j++) {
        this.tier2[i][j] = this.tiers[1].seats[k];
        k++;
      }
    }
    k = 0;
    for (var i = 0; i < this.tiers[2].rows; i++) {
      this.tier3[i] = [];
      for (var j = 0; j < this.tiers[2].cols; j++) {
        this.tier3[i][j] = this.tiers[2].seats[k];
        k++;
      }
    }
    console.log(this.tier1);
  }

  onSeatSelect(seat: Seat) {
    seat.isSelected = !seat.isSelected;
    if (seat.isSelected) {
      this.selectedSeats.push(seat);
      this.totalPrice = this.totalPrice + seat.tier.price;
      if (this.selectedSeats.length === 1) {
        this.selecteSeatsString = this.selecteSeatsString + seat.seatNumber;
      } else {
        this.selecteSeatsString =
          this.selecteSeatsString + ',' + seat.seatNumber;
      }
    } else {
      this.selectedSeats.splice(this.selectedSeats.indexOf(seat), 1);
      this.totalPrice = this.totalPrice - seat.tier.price;
      var arr = this.selecteSeatsString.split(',');
      arr = arr.filter((e) => e !== seat.seatNumber);
      this.selecteSeatsString = arr.toString();
    }
  }

  onConfirmClick(){
    this.modalRef.hide();
    const initialState = {
      selectedSchedule : this.selectedSchedule,
      selectedSeats : this.selectedSeats,
      selectedSeatsString : this.selecteSeatsString,
      totalPrice : this.totalPrice
    }
    this.newModalRef = this.modalServie.show(BookingConfirmationComponent,{initialState});
  }

  onCancelClick() {
    this.selecteSeatsString = "";
    this.selectedSeats = [];
    this.totalPrice = 0;
    this.tier1.forEach(row => {
      row.forEach(seat => seat.isSelected = false);
    })
    this.tier2.forEach(row => {
      row.forEach(seat => seat.isSelected = false);
    })
    this.tier3.forEach(row => {
      row.forEach(seat => seat.isSelected = false);
    })
    this.modalRef.hide();
  }
}
