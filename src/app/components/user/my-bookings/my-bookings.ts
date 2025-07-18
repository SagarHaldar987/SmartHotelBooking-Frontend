import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking/booking.service';
import { Observable } from 'rxjs';

interface Booking {
  bookingID: number;
  hotelName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
}

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css'],
  imports: [CommonModule],
})
export class MyBookings implements OnInit {
  bookings$!: Observable<Booking[]>;

  constructor(private bookingService: BookingService,  private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.bookings$ = this.bookingService.getMyBookings();
    console.log('Bookings:', this.bookings$);
    this.cd.detectChanges();
  }
}
