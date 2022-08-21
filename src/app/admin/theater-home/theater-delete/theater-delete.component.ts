import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';
import { SuccessModalComponent } from 'src/app/success-modal/success-modal.component';

@Component({
  selector: 'app-theater-delete',
  templateUrl: './theater-delete.component.html',
  styleUrls: ['./theater-delete.component.css']
})
export class TheaterDeleteComponent implements OnInit {

  deleteTheater : Theater

  constructor(
    private modalRef: BsModalRef,
    private theaterService: TheaterService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  onConfirm() {
    this.modalRef.hide();
    this.theaterService.deleteTheater(this.deleteTheater).subscribe(response => {
      console.log(response);
      const initialState = {
        successMessage : response.message
      }
      this.modalRef = this.modalService.show(SuccessModalComponent,{initialState});
    })
  }

  onCancel() {
    this.modalRef.hide();
  }
}

