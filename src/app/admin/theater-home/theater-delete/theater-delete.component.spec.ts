import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterDeleteComponent } from './theater-delete.component';

describe('TheaterDeleteComponent', () => {
  let component: TheaterDeleteComponent;
  let fixture: ComponentFixture<TheaterDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
