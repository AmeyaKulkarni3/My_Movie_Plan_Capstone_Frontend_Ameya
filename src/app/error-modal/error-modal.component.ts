import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Error } from '../models/error.model';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {

  errorRes : Error;

  constructor(private modalRef : BsModalRef) { }

  ngOnInit(): void {
  }

  onClose(){
    this.modalRef.hide();
  }

}
