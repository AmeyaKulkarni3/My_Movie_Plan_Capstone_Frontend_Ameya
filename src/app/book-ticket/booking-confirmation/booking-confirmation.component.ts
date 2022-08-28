import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { BookingConfirm } from 'src/app/models/booking-confirm.model';
import { Schedule } from 'src/app/models/schedule.model';
import { Seat } from 'src/app/models/seat.model';
import { BookingService } from 'src/app/services/booking.service';
import { BookingSuccessComponent } from '../booking-success/booking-success.component';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css'],
})
export class BookingConfirmationComponent implements OnInit {

  selectedSchedule: Schedule;
  selectedSeats: Seat[];
  selectedSeatsString: string;
  totalPrice: number;

  addBookingSub : Subscription;

  modalRef : BsModalRef;

  constructor(private newModalRef : BsModalRef, private modalService:BsModalService, private bookingService:BookingService) {}

  ngOnInit(): void {}

  onDoneClick(){
    const bookingConfirm = new BookingConfirm();
    bookingConfirm.scheduleId = this.selectedSchedule.id;
    bookingConfirm.userId = JSON.parse(localStorage.getItem('userData')).userId;
    bookingConfirm.seatNumbers = [];
    this.selectedSeats.forEach(ss => {
      bookingConfirm.seatNumbers.push(ss.id);
    });
    this.addBookingSub = this.bookingService.addBooking(bookingConfirm).subscribe({
      next:res => {
        this.newModalRef.hide();
        this.modalRef = this.modalService.show(BookingSuccessComponent);
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

  }

  onCancelClick(){
    this.selectedSeatsString = "";
    this.selectedSeats = [];
    this.totalPrice = 0;
    this.newModalRef.hide();
  }
}
