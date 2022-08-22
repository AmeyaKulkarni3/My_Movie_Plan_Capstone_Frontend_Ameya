import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { SuccessModalComponent } from 'src/app/success-modal/success-modal.component';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit {
  movie: Movie;
  file: File;

  uploadImageSub: Subscription;

  newModalRef : BsModalRef;

  constructor(
    private movieService: MovieService,
    private modalRef: BsModalRef,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if(this.file === undefined){
      const initialState = {
        errorRes : {code:400,message:"Please Select The file!"}
      };
      this.newModalRef = this.modalService.show(ErrorModalComponent, {
        initialState,
      });
      return;
    }
    this.uploadImageSub = this.movieService
      .uploadImage(this.file, this.movie.id)
      .subscribe({
        next: (res) => {
          const initialState = {
            successMessage: 'Image Uploaded Successfully!',
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
  }

  onSelectFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files.item(0);
    
  }

  onClose() {
    this.modalRef.hide();
  }
}
