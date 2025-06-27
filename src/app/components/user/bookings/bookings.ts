// src/app/components/bookings/bookings.ts
import { routes } from './../../../app.routes';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RoomService, Room } from '../../../services/room/room.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.css'],
  imports: [CommonModule, RouterModule],
})
export class BookingsComponent implements OnInit {
  room!: Room;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    const roomID = +this.route.snapshot.paramMap.get('roomID')!;
    this.roomService.getRoomById(roomID).subscribe((data) => {
      this.room = data;
      console.log('Room details fetched successfully:', this.room);
      this.cdr.markForCheck(); // Ensure change detection runs
    });
  }

  bookNow(): void {
    this.router.navigate(['/add-booking-details'], {
      queryParams: {
        roomID: this.room.roomID,
        price: this.room.price,
      },
    });
  }
}
