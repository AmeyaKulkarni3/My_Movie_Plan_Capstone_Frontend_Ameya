import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingListItemComponent } from './user-booking-list-item.component';

describe('UserBookingListItemComponent', () => {
  let component: UserBookingListItemComponent;
  let fixture: ComponentFixture<UserBookingListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookingListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookingListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
