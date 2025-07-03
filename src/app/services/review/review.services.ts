// src/app/services/review/review.services.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
 
export interface Review {
  reviewID: number;
  userID: number;
  hotelID: number;
  rating: number;
  comment: string;
  timestamp: string;
<<<<<<< HEAD
  userName?: string; 
=======
  userName?: string;
>>>>>>> cd9264230e6d96cbfd731f66bd8d082a7be356e3
}
 
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}
 
  getReviewsByHotelId(hotelId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiBaseUrl}/Reviews/hotel/${hotelId}`, {
      withCredentials: true
    });
  }
 
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${environment.apiBaseUrl}/Reviews`, review, {
      withCredentials: true
    });
  }
}
 