// src/app/services/payment/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiBaseUrl}/Payments`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  makePayment(paymentData: any): Observable<any> {
    const token = this.cookieService.get('token');
  
    if (!token) {
      throw new Error('Authorization token is missing');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post<any>(this.apiUrl, paymentData, { headers });
  }
}