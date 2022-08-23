import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { SuccessModalComponent } from 'src/app/success-modal/success-modal.component';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent implements OnInit, OnDestroy {

  movie : Movie;

  deleteSub : Subscription;

  constructor(
    private modalRef: BsModalRef,
    private movieService: MovieService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  onConfirm() {
    this.modalRef.hide();
    this.deleteSub = this.movieService.deleteMovie(this.movie).subscribe(response => {
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

  ngOnDestroy(): void {
    this.deleteSub.unsubscribe();
  }

}
