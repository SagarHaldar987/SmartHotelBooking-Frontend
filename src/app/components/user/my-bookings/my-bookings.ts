// src/app/components/user/my-bookings/my-bookings.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking/booking.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css'],
  imports: [CommonModule],
})
export class MyBookings {
  bookings$!: Observable<any[]>; // ✅ Observable

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookings$ = this.bookingService.getMyBookings();
  }
}


// import { Component, OnInit } from '@angular/core';
// import { BookingService } from '../../../services/booking/booking.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-my-bookings',
//   templateUrl: './my-bookings.html',
//   styleUrls: ['./my-bookings.css'],
//   imports:[CommonModule],
//   standalone: true,
// })
// export class MyBookings implements OnInit {
//   bookings: any[] = [];

//   constructor(private bookingService: BookingService) {}

//   ngOnInit(): void {
//     this.loadBookings();
//   }

//   loadBookings(): void {
//     this.bookingService.getMyBookings().subscribe({
//       next: (data) => {
//         console.log("✅ My Bookings Data:", data); // Debug
//         this.bookings = data;
//       },
//       error: (err) => {
//         console.error("❌ Failed to load bookings:", err);
//       }
//     });
//   }
// }

