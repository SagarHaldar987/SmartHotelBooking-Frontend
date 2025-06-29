// src/app/components/manager/manager-dashboard/manager-dashboard.ts
import { Component, OnInit } from '@angular/core';
import { HotelService, Hotel } from '../../../services/hotel/hotel.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manager-dashboard.html',
})
export class ManagerDashboard implements OnInit {
  hotels$: Observable<Hotel[]> = of([]);
  userRole = '';
  managerId = 0;

  constructor(private hotelService: HotelService, private authService: AuthService, private router: Router ) {}

  ngOnInit(): void {
    this.managerId = this.authService.getUserId(); // 🔥 use cookie value
    this.userRole = this.authService.getRole() || '';

    if (this.managerId > 0 && this.userRole === 'Manager') {
      this.hotels$ = this.hotelService.getHotelsByManagerId(this.managerId);
    }
  }

  getImageUrl(path: string): string {
    return path.startsWith('http') ? path : `http://localhost:5281/${path}`;
  }

  // viewRooms(hotelId: number) {
  //   // Future logic to view rooms
  //   console.log('View rooms in hotel', hotelId);
  // }

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

