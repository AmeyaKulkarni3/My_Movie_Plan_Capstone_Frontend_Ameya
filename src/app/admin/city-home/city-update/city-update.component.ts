import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-update',
  templateUrl: './city-update.component.html',
  styleUrls: ['./city-update.component.css']
})
export class CityUpdateComponent implements OnInit {

  updateCity : City;

  constructor(private cityService:CityService, private modalRef : BsModalRef) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    this.updateCity.name = form.value.cityName;
    this.cityService.updateCity(this.updateCity);
    this.modalRef.hide();
  }

  onClose(){
    this.modalRef.hide();
  }

}
