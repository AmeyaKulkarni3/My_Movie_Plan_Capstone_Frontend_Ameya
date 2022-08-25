import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BookTicketComponent } from 'src/app/book-ticket/book-ticket.component';
import { Schedule } from 'src/app/models/schedule.model';

@Component({
  selector: 'app-schedule-list-item',
  templateUrl: './schedule-list-item.component.html',
  styleUrls: ['./schedule-list-item.component.css']
})
export class ScheduleListItemComponent implements OnInit {

  @Input() schedule:Schedule;

  modalRef : BsModalRef;

  constructor(private modalService : BsModalService) { }

  ngOnInit(): void {
    console.log(this.schedule);
    
  }

  onScheduleSelect(schedule : Schedule){
    const initialState= {
      selectedSchedule : schedule,
    }

    this.modalRef = this.modalService.show(BookTicketComponent,{initialState,class:'modal-lg'})
  }

}
