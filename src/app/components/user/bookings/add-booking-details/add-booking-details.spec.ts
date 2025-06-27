import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingDetails } from './add-booking-details';

describe('AddBookingDetails', () => {
  let component: AddBookingDetails;
  let fixture: ComponentFixture<AddBookingDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookingDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookingDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
