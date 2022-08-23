import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Genre } from 'src/app/models/genre.model';
import { GenreService } from 'src/app/services/genre.service';
import { SuccessModalComponent } from 'src/app/success-modal/success-modal.component';

@Component({
  selector: 'app-update-genre',
  templateUrl: './update-genre.component.html',
  styleUrls: ['./update-genre.component.css']
})
export class UpdateGenreComponent implements OnInit, OnDestroy {

  genre: Genre;

  updateGenreSub : Subscription;

  constructor(
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    let genre = new Genre();
    genre.id = this.genre.id;
    genre.name = form.value.genreName;

    this.updateGenreSub = this.genreService.updateGenre(genre).subscribe({
      next : res => {
        const initialState = {
          successMessage : "Genre updated successfully!"
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

  onClose() {
    this.modalRef.hide();
  }

  ngOnDestroy(): void {
    this.updateGenreSub.unsubscribe();
  }

}
