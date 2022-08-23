import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Genre } from 'src/app/models/genre.model';
import { GenreService } from 'src/app/services/genre.service';
import { DeleteGenreComponent } from './delete-genre/delete-genre.component';
import { UpdateGenreComponent } from './update-genre/update-genre.component';

@Component({
  selector: 'app-genre-home',
  templateUrl: './genre-home.component.html',
  styleUrls: ['./genre-home.component.css']
})
export class GenreHomeComponent implements OnInit, OnDestroy {

  genres : Genre[] = [];

  addGenre : boolean = false;

  genreSub : Subscription;
  addGenreSub : Subscription;

  modalRef : BsModalRef;

  constructor(private genreService : GenreService, private modalService : BsModalService) { }

  ngOnInit(): void {
    this.genreSub = this.genreService.genres.subscribe({
      next: (response) => {
        this.genres = response;
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

    this.genreService.getGenres();
  }

  onSubmit(form : NgForm){
    const genre = new Genre();
    genre.name = form.value.genreName;
    this.addGenreSub = this.genreService.addGenre(genre).subscribe({
      error: (errorRes) => {
        const initialState = {
          errorRes,
        };
        this.modalRef = this.modalService.show(ErrorModalComponent, {
          initialState,
        });
      },
    });
    form.reset();
  }

  onUpdate(genre: Genre) {
    const initialState = {
      genre : genre
    };
    this.modalRef = this.modalService.show(UpdateGenreComponent,{initialState});
  }

  onDelete(genre: Genre) {
    const initialState = {
      genre: genre,
    };
    this.modalRef = this.modalService.show(DeleteGenreComponent, {initialState});
  }

  onAddGenre(){
    this.addGenre = !this.addGenre;
  }

  ngOnDestroy(): void {
    this.genreSub.unsubscribe();
    this.addGenreSub.unsubscribe();
  }

}
