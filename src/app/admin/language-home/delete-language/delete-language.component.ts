import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Language } from 'src/app/models/language.model';
import { LanguageService } from 'src/app/services/language.service';
import { SuccessModalComponent } from 'src/app/success-modal/success-modal.component';

@Component({
  selector: 'app-delete-language',
  templateUrl: './delete-language.component.html',
  styleUrls: ['./delete-language.component.css']
})
export class DeleteLanguageComponent implements OnInit,OnDestroy {

  language: Language;

  deleteSub: Subscription;

  constructor(
    private modalRef: BsModalRef,
    private languageService: LanguageService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  onConfirm() {
    this.modalRef.hide();
    this.deleteSub = this.languageService
      .deleteLanguage(this.language)
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
