import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Schedule } from '../models/schedule.model';
import { Seat } from '../models/seat.model';
import { Tier } from '../models/tier.model';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  selectedSchedule : Schedule;

  seats : Seat[];
  tiers : Tier[];
  tier1 : Seat[][] = [];
  tier2 : Seat[][] = [];
  tier3 : Seat[][] = [];

  constructor(private modalRef : BsModalRef) { }

  ngOnInit(): void {
    this.seats = this.selectedSchedule.seats;
    this.tiers = this.selectedSchedule.theater.tiers;
    this.seats.forEach(seat => {
      this.tiers.forEach(tier => {
        if(seat.tier.id === tier.id){
          if(tier.seats === null){
            tier.seats = [];
            tier.seats.push(seat);
          } else {
            tier.seats.push(seat);
          }
        }
      })
    });
    var k = 0;
    for(var i =0; i < this.tiers[0].cols; i++){
      for(var j = 0; j < this.tiers[0].rows; j++){
        this.tier1[i][j] = this.tiers[0].seats[k];
        k++;
      }
    }
    k = 0;
    for(var i =0; i < this.tiers[1].cols; i++){
      for(var j = 0; j < this.tiers[1].rows; j++){
        this.tier1[i][j] = this.tiers[1].seats[k];
        k++;
      }
    }
    k = 0;
    for(var i =0; i < this.tiers[2].cols; i++){
      for(var j = 0; j < this.tiers[2].rows; j++){
        this.tier1[i][j] = this.tiers[2].seats[k];
        k++;
      }
    }
    console.log(this.tier1);
  }

  oncancel(){
    this.modalRef.hide();
  }

}
