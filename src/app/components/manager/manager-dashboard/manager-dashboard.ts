// src/app/components/manager/manager-dashboard/manager-dashboard.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HotelService, Hotel } from '../../../services/hotel/hotel.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

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

  constructor(
    private hotelService: HotelService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // ChangeDetectorRef to trigger change detection manually
  ) { }

  hotels: Hotel[] = []; // Local array to store hotels

  ngOnInit(): void {
    this.managerId = this.authService.getUserId();
    this.userRole = this.authService.getRole() || '';

    if (this.managerId > 0 && this.userRole === 'Manager') {
      this.hotels$ = this.hotelService.getHotelsByManagerId(this.managerId);
    }
  }

  getImageUrl(path: string): string {
    // return path.startsWith('http') ? path : `http://localhost:5281/${path}`;
    return path.startsWith('http') ? path : `${environment.fileBaseUrl}${path}`;
  }

  // Add a Room to a Hotel
  addRoom(hotelID: number): void {
    const managerID = this.authService.getUserId();
    console.log('Redirecting to add-room with:', { hotelID, managerID });

    // ✅ Use lowercase keys to match add-room.ts
    this.router.navigate(['/add-room'], {
      queryParams: {
        hotelId: hotelID, // lowercase
        managerId: managerID, // lowercase
      },
    });
  }

  // Delete a Hotel : This method will be called when the delete button is clicked
  deleteHotel(hotelID: number): void {
    const managerID = this.authService.getUserId();

    this.hotelService.deleteHotel(hotelID, managerID).subscribe({
      next: () => {
        console.log('Hotel deleted successfully');

        // ✅ Re-fetch the hotel list after deletion
        this.hotels$ = this.hotelService.getHotelsByManagerId(managerID);

        // ✅ Manually trigger UI update
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error deleting hotel:', error);
      },
    });
  }


  // Update a Hotel : This method will be called when the update button is clicked
  updateHotel(hotelID: number): void {
    const managerID = this.authService.getUserId();
    console.log('Redirecting to update-hotel with:', { hotelID, managerID });

    // ✅ Use lowercase keys to match update-hotel.ts
    this.router.navigate(['/update-hotel'], {
      queryParams: {
        hotelId: hotelID, // lowercase
        managerId: managerID, // lowercase
      },
    });
  }
}
