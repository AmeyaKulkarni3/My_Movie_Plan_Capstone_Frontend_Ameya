import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import { SuccessModalComponent } from 'src/app/success-modal/success-modal.component';

@Component({
  selector: 'app-city-delete',
  templateUrl: './city-delete.component.html',
  styleUrls: ['./city-delete.component.css'],
})
export class CityDeleteComponent implements OnInit {
  deleteCity: City;

  constructor(
    private modalRef: BsModalRef,
    private cityService: CityService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  onConfirm() {
    this.modalRef.hide();
    this.cityService.deleteCity(this.deleteCity).subscribe(response => {
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
