import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Showtime } from 'src/app/models/showtime.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SuccessModalComponent } from 'src/app/success-modal/success-modal.component';

@Component({
  selector: 'app-add-showtime',
  templateUrl: './add-showtime.component.html',
  styleUrls: ['./add-showtime.component.css'],
})
export class AddShowtimeComponent implements OnInit {

  showtimeSub: Subscription;

  constructor(
    private scheduleService: ScheduleService,
    private modalRef: BsModalRef,
    private modalService: BsModalService
  ) {}

  onSubmit(form: NgForm) {
    let showtime = new Showtime();
    showtime.time = form.value.time;
    this.showtimeSub = this.scheduleService.addShowtime(showtime).subscribe({
      next: (res) => {
        const initialState = {
          successMessage: 'Showtime added successfully!',
        };
        this.modalRef = this.modalService.show(SuccessModalComponent, {
          initialState,
        });
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
    this.modalRef.hide();
  }

  onClose(){
    this.modalRef.hide();
  }

  ngOnInit(): void {}
}
