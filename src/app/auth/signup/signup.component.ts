import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private authService: AuthService, private router: Router, private modalService : BsModalService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const firstName = form.value.fname;
    const lastName = form.value.lname;
    const email = form.value.email;
    const password = form.value.password;
    const phone = form.value.phoneNum;

    let authObs: Observable<any>;

    authObs = this.authService.signup(
      firstName,
      lastName,
      email,
      password,
      phone
    );

    authObs.subscribe({
      next: (resData) => {
        this.router.navigate(['/signup-success']);
      },
      error: (errorRes) => {
        const initialState = {
          errorRes
        }
        this.modalRef = this.modalService.show(ErrorModalComponent,{initialState});
      },
    });

    form.reset();
  }
}
