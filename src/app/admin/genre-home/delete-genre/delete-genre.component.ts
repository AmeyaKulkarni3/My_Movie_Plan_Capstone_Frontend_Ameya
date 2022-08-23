import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Genre } from 'src/app/models/genre.model';
import { GenreService } from 'src/app/services/genre.service';
import { SuccessModalComponent } from 'src/app/success-modal/success-modal.component';

@Component({
  selector: 'app-delete-genre',
  templateUrl: './delete-genre.component.html',
  styleUrls: ['./delete-genre.component.css'],
})
export class DeleteGenreComponent implements OnInit, OnDestroy {

  genre: Genre;

  deleteSub: Subscription;

  constructor(
    private modalRef: BsModalRef,
    private genreService: GenreService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  onConfirm() {
    this.modalRef.hide();
    this.deleteSub = this.genreService
      .deleteGenre(this.genre)
      .subscribe((response) => {
        const initialState = {
          successMessage: response.message,
        };
        this.modalRef = this.modalService.show(SuccessModalComponent, {
          initialState,
        });
      });
  }

  onCancel() {
    this.modalRef.hide();
  }

  ngOnDestroy(): void {
    this.deleteSub.unsubscribe();
  }
}
