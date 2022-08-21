import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Address } from 'src/app/models/address.model';
import { City } from 'src/app/models/city.model';
import { Theater } from 'src/app/models/theater.model';
import { Tier } from 'src/app/models/tier.model';
import { CityService } from 'src/app/services/city.service';
import { TheaterService } from 'src/app/services/theater.service';
import { AddTierComponent } from './add-tier/add-tier.component';
import { TheaterDeleteComponent } from './theater-delete/theater-delete.component';
import { TheaterUpdateComponent } from './theater-update/theater-update.component';

@Component({
  selector: 'app-theater-home',
  templateUrl: './theater-home.component.html',
  styleUrls: ['./theater-home.component.css'],
})
export class TheaterHomeComponent implements OnInit {
  cities: City[] = [];
  tiers: Tier[] = [];
  theaters: Theater[] = [];

  tempTiers : Tier[] = [];

  theaterSub: Subscription;
  tierSub: Subscription;
  citySub: Subscription;

  modalRef: BsModalRef;

  constructor(
    private cityService: CityService,
    private theaterService: TheaterService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {

    this.citySub = this.cityService.cities.subscribe({
      next : response => {
        this.cities = response;
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
    this.tierSub = this.theaterService.tiers.subscribe({
      next : response => {
        this.tiers = response;
        this.tempTiers = this.tiers.slice();
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
    this.theaterSub = this.theaterService.theaters.subscribe({
      next: response => {
        this.theaters = response;
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
    this.cityService.getCities();
    this.theaterService.getTiers();
    this.theaterService.getTheaters();
  }

  onSubmit(form :NgForm){
    console.log(form);
    const t = new Theater();
    const address = new Address();
    const ts :Tier[] = [];
    const cityId = +form.value.cityName;
    console.log(cityId);
    let city = new City();
    city = this.cities.find(c => {console.log(c);
      if(c.id === cityId){
        return c;
      } else {
        return null;
      }
    });
    address.line1 = form.value.line1;
    address.line2 = form.value.line2;
    address.pincode = form.value.pincode;
    address.city = city;
    t.address = address;
    t.city = city;
    const tierIds = [+form.value.tier1, +form.value.tier2, +form.value.tier3];
    tierIds.forEach(id => {
      const tier = this.tiers.find(tr => id === tr.id ? tr : null);
      ts.push(tier);
    });
    t.tiers = ts;
    t.name = form.value.theaterName;
    console.log(t);
    this.theaterService.addTheater(t);
    form.reset();
  }

  onUpdate(theater : Theater){
    const initialState = {
      updateTheater: theater,
    };
    this.modalRef = this.modalService.show(TheaterUpdateComponent, {
      initialState,
    });

  }

  onDelete(theater : Theater){
    const initialState = {
      deleteTheater: theater,
    };
    this.modalRef = this.modalService.show(TheaterDeleteComponent, {
      initialState,
    });
  }

  onAddTier(){
    this.modalRef = this.modalService.show(AddTierComponent);
  }
}
