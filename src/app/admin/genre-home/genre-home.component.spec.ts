import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreHomeComponent } from './genre-home.component';

describe('GenreHomeComponent', () => {
  let component: GenreHomeComponent;
  let fixture: ComponentFixture<GenreHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
