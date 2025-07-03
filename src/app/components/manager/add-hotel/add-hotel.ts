// src/app/components/manager/add-hotel/add-hotel.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../../../services/hotel/hotel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.html',
  styleUrls: ['./add-hotel.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AddHotel implements OnInit {
  name = '';
  location = '';
  amenities = '';
  rating!: number;
  imageFile!: File;
  managerID: number = 0;

  constructor(
    private hotelService: HotelService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.managerID = this.authService.getUserId();
    console.log('🔎 Fetched Manager ID in ngOnInit:', this.managerID);

    if (!this.managerID) {
      alert('Error: Manager ID not found. Please log in again.');
      this.router.navigate(['/login']);
    }
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  submitHotel(): void {
    console.log('📤 Submitting with Manager ID:', this.managerID);

    const formData = new FormData();
    formData.append('Name', this.name);
    formData.append('Location', this.location);
    formData.append('ManagerID', this.managerID.toString());
    formData.append('Amenities', this.amenities);
    formData.append('Rating', this.rating.toString());
    formData.append('Image', this.imageFile);

    this.hotelService.addHotel(formData, this.managerID).subscribe({
      next: (res) => {
        console.log('✅ Hotel added successfully:', res);
        alert('Hotel added successfully!');
        this.router.navigate(['/manager-dashboard']);
      },
      error: (err) => {
        console.error('❌ Error adding hotel:', err);
        alert('Manager is Already Assigned to a Hotel. Please try again with a different Manager ID.');
        this.router.navigate(['/manager-dashboard']);
      }
    });
  }
}
