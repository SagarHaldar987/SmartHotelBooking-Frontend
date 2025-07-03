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
  userName?: string; 
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
