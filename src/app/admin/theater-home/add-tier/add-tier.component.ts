import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Tier } from 'src/app/models/tier.model';
import { TheaterService } from 'src/app/services/theater.service';

@Component({
  selector: 'app-add-tier',
  templateUrl: './add-tier.component.html',
  styleUrls: ['./add-tier.component.css']
})
export class AddTierComponent implements OnInit {

   constructor(private theaterService:TheaterService, private modalRef:BsModalRef) { }

  ngOnInit(): void {
  }

  onSubmit(form :NgForm){
    const tier = new Tier();
    tier.name = form.value.tierName;
    tier.noOfSeats = form.value.noOfSeats;
    tier.rows = form.value.rows;
    tier.cols = form.value.cols;
    tier.price = form.value.price;
    tier.priority = form.value.priority;
    this.theaterService.addTier(tier);
    this.modalRef.hide();
  }

  onCancel(){
    this.modalRef.hide();
  }

}
