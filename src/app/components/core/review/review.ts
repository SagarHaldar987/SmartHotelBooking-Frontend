// src/app/components/hotel-reviews/reviews.ts
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService, Hotel } from '../../../services/hotel/hotel.service';
import { ReviewService } from '../../../services/review/review.services';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
 
type Review = {
  reviewID: number;
  userID: number;
  hotelID: number;
  rating: number;
  comment: string;
  timestamp: string;
  userName?: string;
};
 
@Component({
  selector: 'app-reviews',
  templateUrl: './review.html',
  styleUrls: ['./review.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class Reviews implements OnInit {
  hotel!: Hotel;
  reviews: Review[] = [];
  hotelID!: number;
 
  newRating: number = 5;
  newComment: string = '';
 
  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    this.hotelID = Number(this.route.snapshot.paramMap.get('hotelID'));
 
    this.hotelService.getHotelById(this.hotelID).subscribe({
      next: (data) => {
        data.imageUrl = data.imageUrl?.startsWith('http')
          ? data.imageUrl
          : `${environment.apiBaseUrl}${data.imageUrl}`;
        this.hotel = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Hotel fetch error', err)
    });
 
    this.reviewService.getReviewsByHotelId(this.hotelID).subscribe({
      next: (data) => {
        this.reviews = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Review fetch error', err)
    });
  }
 
  addReview(): void {
    const review: Review = {
      reviewID: 0,
      userID: this.authService.getUserId(),
      hotelID: this.hotelID,
      rating: this.newRating,
      comment: this.newComment,
      timestamp: new Date().toISOString(),
      userName: this.authService.getName()
    };
 
    this.reviewService.addReview(review).subscribe({
      next: (data) => {
        this.reviews = [...this.reviews, data];
        this.newComment = '';
        this.newRating = 5;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Add review error', err)
    });
  }
}
 
 
