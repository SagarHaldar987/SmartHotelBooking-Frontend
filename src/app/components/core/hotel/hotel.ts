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
  ) { }

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


  // ✅ Fix this in hotel.ts
  addRoom(hotelID: number): void {
    const managerID = this.authService.getUserId();
    console.log('Redirecting to add-room with:', { hotelID, managerID });

    // ✅ Use lowercase keys to match add-room.ts
    this.router.navigate(['/add-room'], {
      queryParams: {
        hotelId: hotelID,      // lowercase
        managerId: managerID   // lowercase
      }
    });
  }
}