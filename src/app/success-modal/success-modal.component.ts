import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements OnInit {

  successMessage : string;

  constructor(private newModalRef : BsModalRef) { }

  ngOnInit(): void {
  }

  onClose(){
    this.newModalRef.hide();
  }

}
