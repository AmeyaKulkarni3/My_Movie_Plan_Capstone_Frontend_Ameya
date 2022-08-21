import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterUpdateComponent } from './theater-update.component';

describe('TheaterUpdateComponent', () => {
  let component: TheaterUpdateComponent;
  let fixture: ComponentFixture<TheaterUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
