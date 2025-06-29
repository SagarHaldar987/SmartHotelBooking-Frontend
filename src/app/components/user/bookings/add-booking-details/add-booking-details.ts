// src/app/components/user/bookings/add-booking-details/add-booking-details.ts file
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookingService, Booking } from '../../../../services/booking/booking.service';

@Component({
  selector: 'app-add-booking-details',
  templateUrl: './add-booking-details.html',
  standalone: true,
  imports: [FormsModule],
})
export class AddBookingDetails implements OnInit {
  roomID!: number;
  price!: number;
  checkInDate!: string;
  checkOutDate!: string;

  today!: string;
  minCheckOutDate!: string;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.roomID = +params['roomID'];
      this.price = +params['price'];
    });

    const now = new Date();
    this.today = this.formatDate(now);
    this.minCheckOutDate = this.today;
  }

  onCheckInChange(): void {
    if (this.checkInDate) {
      this.minCheckOutDate = this.checkInDate;
      if (this.checkOutDate && this.checkOutDate < this.checkInDate) {
        this.checkOutDate = this.checkInDate; // adjust if invalid
      }
    }
  }

  private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  payNow(): void {
    // ✅ 1. Validation check before making API call
    if (!this.checkInDate || !this.checkOutDate) {
      alert('Please select both check-in and check-out dates.');
      return; // stop further execution
    }

    // ✅ 2. Prepare the booking object
    const booking: Booking = {
      roomID: this.roomID,
      // checkInDate: this.checkInDate,
      // checkOutDate: this.checkOutDate,
      checkInDate: new Date(this.checkInDate).toISOString(),      // "2025-07-01T00:00:00.000Z"
      checkOutDate: new Date(this.checkOutDate).toISOString(),     // "2025-07-02T00:00:00.000Z"
      status: true // ✅ Must be boolean (NOT "Confirmed")
    };

    console.log('Sending booking payload:', booking);

    // ✅ 3. Call the API
    this.bookingService.createBooking(booking).subscribe({
      next: (response) => {
        console.log('✅ Booking Response:', response);

        // ✅ 4. Navigate to Payment component with queryParams
        this.router.navigate(['/payment'], {
          queryParams: {
            hotelId: response.hotelID,
            userId: response.userID,
            bookingId: response.bookingID,
            amount: this.price
          }
        });
      },

      // ✅ 5. Handle errors gracefully
      error: (err) => {
        console.error('❌ Booking API Error:', err);
        alert('Booking failed. Please try again.');
      }
    });
  }
}
