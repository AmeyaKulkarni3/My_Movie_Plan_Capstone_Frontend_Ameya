import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { Booking } from '../models/booking.model';
import { City } from '../models/city.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';
import { CityService } from '../services/city.service';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';
import { UserBookingComponent } from '../user/user-booking/user-booking.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription = new Subscription();
  private userDataSub: Subscription = new Subscription();

  isAuthenticated = false;
  onLogin = true;
  isUserAvailable = false;
  user: User;
  isAdmin = false;
  bookings: Booking[];

  citySub: Subscription;
  activCitySub: Subscription;
  bookingSub: Subscription;

  cities: City[] = [];
  activeCity: City;

  modalRef: BsModalRef;
  newModalRef : BsModalRef;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cityService: CityService,
    private modalService: BsModalService,
    private movieService: MovieService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !!user;
        if (user) {
          this.isAdmin = user.roles === '[ROLE_ADMIN]' ? true : false;
        }
      },
    });

    this.userDataSub = this.userService.fetchedUser.subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          console.log(this.user);
          this.isUserAvailable = true;
        }
      },
    });

    if (localStorage.getItem('activeCity')) {
      console.log('using localstorage city');
      this.activeCity = JSON.parse(localStorage.getItem('activeCity'));
      this.cityService.activeCity.emit(this.activeCity);
    }

    this.activCitySub = this.cityService.activeCity.subscribe({
      next: (res) => {
        this.activeCity = res;
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

    this.citySub = this.cityService.cities.subscribe({
      next: (response) => {
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
  }

  onCitySelect(city: City) {
    console.log(city);
    this.activeCity = city;
    localStorage.setItem('activeCity', JSON.stringify(city));
    this.cityService.activeCity.emit(this.activeCity);
  }

  onSearchClick(form: NgForm) {
    console.log(form.value.movieName);
    this.movieService.updateSearchString(form.value.movieName);
  }

  onChange() {
    this.movieService.updateSearchString('');
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.userDataSub.unsubscribe();
    this.activCitySub.unsubscribe();
    this.bookingSub.unsubscribe();
  }

  onSignup() {
    this.onLogin = !this.onLogin;
  }

  onlogin() {
    this.onLogin = !this.onLogin;
  }

  onLogout() {
    this.authService.logout();
  }

  onGetBookings() {
    this.bookingService.getUserBookings(this.user.userId);
    this.newModalRef = this.modalService.show(UserBookingComponent);
  }
}
