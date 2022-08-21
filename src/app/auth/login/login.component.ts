import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  isAdmin: boolean = false;

  modalRef : BsModalRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private modalService:BsModalService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<any>;

    authObs = this.authService.login(email, password);

    authObs.subscribe({
      next: (resData) => {
        if (resData.headers.headers.get('roles')[0] === '[ROLE_ADMIN]') {
          this.router.navigate(['/admin/home']);
        } else if (resData.headers.headers.get('roles')[0] === '[ROLE_USER]') {
          this.router.navigate(['/user/home']);
        }
        const loggedInUser = JSON.parse(localStorage.getItem("userData"));
        this.userService.getUser(loggedInUser.userId);
      },
      error: (errorRes) => {
        console.log(errorRes);
        const initialState = {
          errorRes
        }
        this.modalRef = this.modalService.show(ErrorModalComponent,{initialState});
      },
    });

    form.reset();
  }
}
