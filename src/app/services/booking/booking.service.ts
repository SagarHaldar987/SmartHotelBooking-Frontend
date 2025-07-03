// src/app/services/booking/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

export interface Booking {
  roomID: number;
  checkInDate: string;
  checkOutDate: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createBooking(booking: Booking): Observable<any> {
    const token = this.cookieService.get('token'); // ✅ Get token from cookie

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${environment.apiBaseUrl}/Bookings`, booking, { headers });
  }

  cancelBooking(bookingId: number): Observable<any> {
    const token = this.cookieService.get('token'); // ✅ Get token from cookie

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete<any>(`${environment.apiBaseUrl}/Bookings/${bookingId}`, { headers });
  }


  // Method to fetch all the Bookings of LoggedIn User
  getMyBookings(): Observable<any> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${environment.apiBaseUrl}/Bookings/my`, { headers });
  }
}








// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../../environments/environment';

// export interface Booking {
//   roomID: number;
//   checkInDate: string;
//   checkOutDate: string;
//   status: boolean;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class BookingService {
//   constructor(private http: HttpClient) {}

//   createBooking(booking: Booking): Observable<any> {
//     return this.http.post<any>(`${environment.apiBaseUrl}/Bookings`, booking);
//   }
// }
