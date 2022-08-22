import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { SuccessModalComponent } from 'src/app/success-modal/success-modal.component';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css'],
})
export class UpdateMovieComponent implements OnInit {
  movie: Movie;

  updateMovieSub : Subscription;

  constructor(
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    let movie = new Movie();
    movie.id = this.movie.id;
    movie.name = form.value.movieName;
    movie.directors = form.value.directors;
    movie.cast = form.value.cast;
    movie.duration = form.value.duration;
    movie.releaseDate = form.value.releaseDate;

    this.updateMovieSub = this.movieService.updateMovie(movie).subscribe({
      next : res => {
        const initialState = {
          successMessage : "Movie details updated successfully!"
        };
        this.modalRef = this.modalService.show(SuccessModalComponent, {
          initialState,
        });
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
    this.modalRef.hide();
    form.reset();
  }

  onClose() {}
}
