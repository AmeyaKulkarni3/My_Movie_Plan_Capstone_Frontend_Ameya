import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Language } from 'src/app/models/language.model';
import { LanguageService } from 'src/app/services/language.service';
import { SuccessModalComponent } from 'src/app/success-modal/success-modal.component';

@Component({
  selector: 'app-update-language',
  templateUrl: './update-language.component.html',
  styleUrls: ['./update-language.component.css']
})
export class UpdateLanguageComponent implements OnInit, OnDestroy {

  language: Language;

  updateLanguageSub : Subscription;

  constructor(
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    let language = new Language();
    language.id = this.language.id;
    language.name = form.value.languageName;

    this.updateLanguageSub = this.languageService.updateLanguage(language).subscribe({
      next : res => {
        const initialState = {
          successMessage : "Language updated successfully!"
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
    this.updateLanguageSub.unsubscribe();
  }

}
