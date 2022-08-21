import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import { CityDeleteComponent } from './city-delete/city-delete.component';
import { CityUpdateComponent } from './city-update/city-update.component';

@Component({
  selector: 'app-city-home',
  templateUrl: './city-home.component.html',
  styleUrls: ['./city-home.component.css'],
})
export class CityHomeComponent implements OnInit, OnDestroy {
  cities: City[] = [];

  modalRef: BsModalRef;

  citySub: Subscription;
  addCitySub: Subscription;
  GetCitySub :Subscription;

  constructor(
    private cityService: CityService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    // this.citySub = this.cityService.getCities().subscribe({
    //   next: (response) => {
    //     response.forEach((res) => {
    //       let city = new City();
    //       city.id = res.id;
    //       city.name = res.name;
    //       this.cities.push(city);
    //     });
    //   },
    //   error: (errorRes) => {
    //     const initialState = {
    //       errorRes,
    //     };
    //     this.modalRef = this.modalService.show(ErrorModalComponent, {
    //       initialState,
    //     });
    //   },
    // });
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
    this.GetCitySub = this.cityService.getCities();
    
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.addCitySub = this.cityService.addCity(form.value.cityName).subscribe({
      next: (response) => {
        this.cities.push(response);
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

  onUpdate(city: City) {
    const initialState = {
      updateCity: city,
    };
    this.modalRef = this.modalService.show(CityUpdateComponent, {
      initialState,
    });
  }

  onDelete(city:City) {
    const initialState = {
      deleteCity: city,
    };
    this.modalRef = this.modalService.show(CityDeleteComponent, {
      initialState,
    });
    
  }

  ngOnDestroy(): void {
    this.citySub.unsubscribe();
    this.addCitySub.unsubscribe();
    this.GetCitySub.unsubscribe();
  }
}
