import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService, Hotel } from '../../../services/hotel/hotel.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.html',
  styleUrls: ['./update-hotel.css'],
  imports: [CommonModule, FormsModule],
})
export class UpdateHotel implements OnInit {
  hotelID: number | null = null;
  managerID: number | null = null;
  hotel: Hotel = {
    hotelID: 0,
    name: '',
    location: '',
    managerID: 0,
    amenities: '',
    rating: 0,
    imageUrl: ''
  };
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get query parameters
    this.hotelID = Number(this.route.snapshot.queryParamMap.get('hotelId'));
    this.managerID = Number(this.route.snapshot.queryParamMap.get('managerId'));

    if (this.hotelID && this.managerID) {
      this.fetchHotelDetails();
    } else {
      this.errorMessage = 'Missing hotel or manager ID.';
      this.isLoading = false;
    }
  }

  fetchHotelDetails(): void {
    this.hotelService.getHotelsByManagerId(this.managerID!).subscribe({
      next: (hotels) => {
        const foundHotel = hotels.find(h => h.hotelID === this.hotelID);
        if (foundHotel) {
          this.hotel = foundHotel;
        } else {
          this.errorMessage = 'Hotel not found for this manager.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching hotel details.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    const updatedHotel = {
      name: this.hotel.name,
      location: this.hotel.location,
      managerID: this.managerID!,
      amenities: this.hotel.amenities,
      rating: this.hotel.rating
    };
  
    this.hotelService.updateHotel(this.hotelID!, this.managerID!, updatedHotel).subscribe({
      next: (response) => {
        alert(response.message || 'Hotel updated successfully!');
        this.router.navigate(['/manager-dashboard']);
      },
      error: (err) => {
        alert('Failed to update hotel.');
        console.error(err);
      }
    });
  }
  
  // onSubmit(): void {
  //   const formData = new FormData();
  //   formData.append('name', this.hotel.name);
  //   formData.append('location', this.hotel.location);
  //   formData.append('managerID', this.managerID!.toString());
  //   formData.append('amenities', this.hotel.amenities);
  //   formData.append('rating', this.hotel.rating.toString());

  //   this.hotelService.updateHotel(this.hotelID!, this.managerID!, formData).subscribe({
  //     next: (response) => {
  //       alert(response.message || 'Hotel updated successfully!');
  //       this.router.navigate(['/manager-dashboard']);
  //     },
  //     error: (err) => {
  //       alert('Failed to update hotel.');
  //     }
  //   });
  // }
}
