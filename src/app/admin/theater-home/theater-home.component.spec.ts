import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterHomeComponent } from './theater-home.component';

describe('TheaterHomeComponent', () => {
  let component: TheaterHomeComponent;
  let fixture: ComponentFixture<TheaterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
