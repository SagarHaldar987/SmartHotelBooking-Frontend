// src/app/components/user/payment/payment.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../services/payment/payment.service';
import { BookingService } from '../../../services/booking/booking.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.html',
  styleUrl: './payment.css',
  standalone: true, // ✅ Mark as standalone
  imports: [FormsModule], // ✅ Include FormsModule
})
export class Payment implements OnInit {
  hotelID!: number;
  userID!: number;
  bookingID!: number;
  amount!: number;
  paymentMethod: string = 'UPI';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.hotelID = +params['hotelId'];
      this.userID = +params['userId'];
      this.bookingID = +params['bookingId'];
      this.amount = +params['amount'];

      console.log('Received amount:', this.amount);
    });
  }

  pay(): void {
    const paymentData = {
      paymentID: 0,
      hotelID: this.hotelID,
      userID: this.userID,
      bookingID: this.bookingID,
      amount: this.amount,
      status: 'Booked',
      paymentMethod: this.paymentMethod
    };

    // Log the payment data to the console for debugging
    console.log('Sending payment data:', paymentData);
    this.paymentService.makePayment(paymentData).subscribe(response => {
      alert('Pay for Booking the Room');
      this.router.navigate(['/my-bookings']);
    });
  }

  cancel(): void {
    this.bookingService.cancelBooking(this.bookingID).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}