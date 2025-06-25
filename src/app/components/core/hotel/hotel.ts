// src/app/components/hotel/hotel.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HotelService, Hotel } from '../../../services/hotel.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.html',
  styleUrl: './hotel.css',
  imports: [CommonModule],
})

export class HotelComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(private hotelService: HotelService, private router: Router, private cdr : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        console.log('Hotels fetched successfully:', this.hotels);
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 401) {
          console.warn('Unauthorized access. Redirecting to login...');
          this.router.navigate(['/login']);
        }
      },
      complete: () => {
        console.log('Hotel fetch completed.');
      }
    });
  }

  viewRooms(hotelID: number): void {
    this.router.navigate(['/rooms', hotelID]);
  }
}
