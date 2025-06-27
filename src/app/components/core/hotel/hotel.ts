// src/app/components/hotel/hotel.ts
import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { HotelService, Hotel } from '../../../services/hotel/hotel.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
 
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.html',
  styleUrls: ['./hotel.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class HotelComponent implements OnInit {
  hotels$!: Observable<Hotel[]>;
  userRole: string = '';
 
  constructor(
    private hotelService: HotelService,
    private router: Router,
    private authService: AuthService
  ) {}
 
  // ngOnInit(): void {
  //   this.userRole = this.authService.getRole() ?? '';
  //   this.hotels$ = this.hotelService.getAllHotels();
  // }
  ngOnInit(): void {
    this.userRole = this.authService.getRole() ?? '';
    this.hotels$ = this.hotelService.getAllHotels();
  
    // Debugging API response
    this.hotels$.subscribe({
      next: (hotels) => console.log('Hotels fetched:', hotels),
      error: (err) => console.error('Error fetching hotels:', err)
    });
  }
  
 
  viewRooms(hotelID: number): void {
    this.router.navigate(['/rooms', hotelID]);
  }
 
  addHotel(): void {
    this.router.navigate(['/add-hotel']);
  }
 
  // Method to construct the image URL
  getImageUrl(imagePath: string): string {
    const baseUrl = 'http://localhost:5281'; // Replace with your actual base URL
    return `${baseUrl}${imagePath}`;
  }
}




// import {
//   ChangeDetectionStrategy,
//   Component,
//   OnInit
// } from '@angular/core';
// import { HotelService, Hotel } from '../../../services/hotel/hotel.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Observable } from 'rxjs';
// import { AuthService } from '../../../services/auth/auth.service';

// @Component({
//   selector: 'app-hotel',
//   templateUrl: './hotel.html',
//   styleUrls: ['./hotel.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   standalone: true,
//   imports: [CommonModule],
// })
// export class HotelComponent implements OnInit {
//   hotels$!: Observable<Hotel[]>;
//   userRole: string = '';

//   constructor(
//     private hotelService: HotelService,
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.userRole = this.authService.getRole() ?? '';
//     this.hotels$ = this.hotelService.getAllHotels();
//   }

//   viewRooms(hotelID: number): void {
//     this.router.navigate(['/rooms', hotelID]);
//   }

//   addHotel(): void {
//     this.router.navigate(['/add-hotel']);
//   }
// }








// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { HotelService, Hotel } from '../../../services/hotel.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-hotel',
//   templateUrl: './hotel.html',
//   styleUrl: './hotel.css',
//   imports: [CommonModule],
// })

// export class HotelComponent implements OnInit {
//   hotels: Hotel[] = [];

//   constructor(private hotelService: HotelService, private router: Router, private cdr : ChangeDetectorRef) {}

//   ngOnInit(): void {
//     this.hotelService.getAllHotels().subscribe({
//       next: (data) => {
//         this.hotels = data;
//         console.log('Hotels fetched successfully:', this.hotels);
//         this.cdr.detectChanges();
//       },
//       error: (err) => {
//         if (err.status === 401) {
//           console.warn('Unauthorized access. Redirecting to login...');
//           this.router.navigate(['/login']);
//         }
//       },
//       complete: () => {
//         console.log('Hotel fetch completed.');
//       }
//     });
//   }

//   viewRooms(hotelID: number): void {
//     this.router.navigate(['/rooms', hotelID]);
//   }
// }