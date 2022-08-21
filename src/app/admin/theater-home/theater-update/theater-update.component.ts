import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';

@Component({
  selector: 'app-theater-update',
  templateUrl: './theater-update.component.html',
  styleUrls: ['./theater-update.component.css']
})
export class TheaterUpdateComponent implements OnInit {

  updateTheater : Theater;

  constructor(private theaterService : TheaterService, private modalRef : BsModalRef) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    this.updateTheater.name = form.value.theaterName;
    this.theaterService.updateTheater(this.updateTheater);
    this.modalRef.hide();
  }

  onClose(){
    this.modalRef.hide();
  }

}
