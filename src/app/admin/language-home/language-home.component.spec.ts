import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageHomeComponent } from './language-home.component';

describe('LanguageHomeComponent', () => {
  let component: LanguageHomeComponent;
  let fixture: ComponentFixture<LanguageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
