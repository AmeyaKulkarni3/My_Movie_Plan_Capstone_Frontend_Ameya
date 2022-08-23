import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Schedule } from 'src/app/models/schedule.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SuccessModalComponent } from 'src/app/success-modal/success-modal.component';

@Component({
  selector: 'app-delete-schedule',
  templateUrl: './delete-schedule.component.html',
  styleUrls: ['./delete-schedule.component.css']
})
export class DeleteScheduleComponent implements OnInit,OnDestroy {

  schedule: Schedule;

  deleteSub: Subscription;

  constructor(
    private modalRef: BsModalRef,
    private scheduleService: ScheduleService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  onConfirm() {
    this.modalRef.hide();
    this.deleteSub = this.scheduleService
      .deleteSchedule(this.schedule)
      .subscribe((response) => {
        const initialState = {
          successMessage: response.message,
        };
        this.modalRef = this.modalService.show(SuccessModalComponent, {
          initialState,
        });
      });
  }

  onCancel() {
    this.modalRef.hide();
  }

  ngOnDestroy(): void {
    this.deleteSub.unsubscribe();
  }

}
