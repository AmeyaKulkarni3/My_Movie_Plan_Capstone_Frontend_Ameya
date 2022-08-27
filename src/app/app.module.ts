import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {ModalModule} from 'ngx-bootstrap/modal'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { SignupSuccessComponent } from './user/signup-success/signup-success.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { CityHomeComponent } from './admin/city-home/city-home.component';
import { TheaterHomeComponent } from './admin/theater-home/theater-home.component';
import { GenreHomeComponent } from './admin/genre-home/genre-home.component';
import { LanguageHomeComponent } from './admin/language-home/language-home.component';
import { MovieHomeComponent } from './admin/movie-home/movie-home.component';
import { CityUpdateComponent } from './admin/city-home/city-update/city-update.component';
import { CityDeleteComponent } from './admin/city-home/city-delete/city-delete.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { AddTierComponent } from './admin/theater-home/add-tier/add-tier.component';
import { TheaterUpdateComponent } from './admin/theater-home/theater-update/theater-update.component';
import { TheaterDeleteComponent } from './admin/theater-home/theater-delete/theater-delete.component';
import { UploadImageComponent } from './admin/movie-home/upload-image/upload-image.component';
import { UpdateMovieComponent } from './admin/movie-home/update-movie/update-movie.component';
import { DeleteMovieComponent } from './admin/movie-home/delete-movie/delete-movie.component';
import { UpdateGenreComponent } from './admin/genre-home/update-genre/update-genre.component';
import { DeleteGenreComponent } from './admin/genre-home/delete-genre/delete-genre.component';
import { UpdateLanguageComponent } from './admin/language-home/update-language/update-language.component';
import { DeleteLanguageComponent } from './admin/language-home/delete-language/delete-language.component';
import { ScheduleHomeComponent } from './admin/schedule-home/schedule-home.component';
import { AddShowtimeComponent } from './admin/schedule-home/add-showtime/add-showtime.component';
import { DeleteScheduleComponent } from './admin/schedule-home/delete-schedule/delete-schedule.component';
import { MovieListItemComponent } from './movie/movie-list-item/movie-list-item.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { ScheduleListItemComponent } from './schedule/schedule-list-item/schedule-list-item.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { BookingConfirmationComponent } from './book-ticket/booking-confirmation/booking-confirmation.component';
import { BookingSuccessComponent } from './book-ticket/booking-success/booking-success.component';
import { UserBookingComponent } from './user/user-booking/user-booking.component';
import { UserBookingListItemComponent } from './user/user-booking/user-booking-list-item/user-booking-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    AdminHomeComponent,
    UserHomeComponent,
    SignupSuccessComponent,
    ErrorModalComponent,
    CityHomeComponent,
    TheaterHomeComponent,
    GenreHomeComponent,
    LanguageHomeComponent,
    MovieHomeComponent,
    CityUpdateComponent,
    CityDeleteComponent,
    SuccessModalComponent,
    AddTierComponent,
    TheaterUpdateComponent,
    TheaterDeleteComponent,
    UploadImageComponent,
    UpdateMovieComponent,
    DeleteMovieComponent,
    UpdateGenreComponent,
    DeleteGenreComponent,
    UpdateLanguageComponent,
    DeleteLanguageComponent,
    ScheduleHomeComponent,
    AddShowtimeComponent,
    DeleteScheduleComponent,
    MovieListItemComponent,
    MovieDetailComponent,
    ScheduleListItemComponent,
    BookTicketComponent,
    BookingConfirmationComponent,
    BookingSuccessComponent,
    UserBookingComponent,
    UserBookingListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
