import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Language } from 'src/app/models/language.model';
import { LanguageService } from 'src/app/services/language.service';
import { DeleteLanguageComponent } from './delete-language/delete-language.component';
import { UpdateLanguageComponent } from './update-language/update-language.component';

@Component({
  selector: 'app-language-home',
  templateUrl: './language-home.component.html',
  styleUrls: ['./language-home.component.css']
})
export class LanguageHomeComponent implements OnInit, OnDestroy {

  languages : Language[] = [];

  addLanguage : boolean = false;

  languageSub : Subscription;
  addLanguageSub : Subscription;

  modalRef : BsModalRef;

  constructor(private languageService : LanguageService, private modalService : BsModalService) { }

  ngOnInit(): void {
    this.languageSub = this.languageService.languages.subscribe({
      next: (response) => {
        this.languages = response;
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

    this.languageService.getLanguages();
  }

  onSubmit(form : NgForm){
    const language = new Language();
    language.name = form.value.languageName;
    this.addLanguageSub = this.languageService.addLanguage(language).subscribe({
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

  onUpdate(language: Language) {
    const initialState = {
      language : language
    };
    this.modalRef = this.modalService.show(UpdateLanguageComponent,{initialState});
  }

  onDelete(language: Language) {
    const initialState = {
      language: language,
    };
    this.modalRef = this.modalService.show(DeleteLanguageComponent, {initialState});
  }

  onAddLanguage(){
    this.addLanguage = !this.addLanguage;
  }

  ngOnDestroy(): void {
    this.languageSub.unsubscribe();
    this.addLanguageSub.unsubscribe();
  }

}
