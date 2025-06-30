// src/app/components/hotel-reviews/reviews.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService, Hotel } from '../../../services/hotel/hotel.service';
import { ReviewService, Review } from '../../../services/review/review.services';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-reviews',
  templateUrl: './review.html',
  styleUrls: ['./review.css'],
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
  ) { }

  ngOnInit(): void {
    this.hotelID = Number(this.route.snapshot.paramMap.get('hotelID'));

    this.hotelService.getHotelById(this.hotelID).subscribe({
      next: (data) => {
        data.imageUrl = `${environment.apiBaseUrl}${data.imageUrl}`; // ✅ Prefix URL
        this.hotel = data;

        console.log('Hotel info fetched:', this.hotel); // ✅ Console

        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Hotel fetch error', err)
    });

    this.reviewService.getReviewsByHotelId(this.hotelID).subscribe({
      next: (data) => (this.reviews = data),
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
    };

    this.reviewService.addReview(review).subscribe({
      next: (data) => {
        this.reviews.push(data);
        this.newComment = '';
        this.newRating = 5;
      },
      error: (err) => console.error('Add review error', err)
    });
  }

  getUserName(): string {
    return this.authService.getName(); // 👈 Add this in auth.service.ts
  }

  getImageUrl(path: string): string {
    return `http://localhost:5281${path}`;
  }
}
