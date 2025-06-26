// src/app/components/bookings/bookings.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService, Room } from '../../../services/room/room.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.css'],
  imports: [CommonModule],
})
export class BookingsComponent implements OnInit {
  room!: Room;

  constructor(
    private route: ActivatedRoute, 
    private roomService: RoomService,
    private cdr : ChangeDetectorRef
) {}

  ngOnInit(): void {
    const roomID = +this.route.snapshot.paramMap.get('roomID')!;
    this.roomService.getRoomById(roomID).subscribe(data => {
      this.room = data;
      console.log('Room details fetched successfully:', this.room);
      this.cdr.markForCheck(); // Ensure change detection runs
    });
  }

  payNow(): void {
    // Payment logic here
    alert(`Proceeding to payment for Room ID: ${this.room.roomID}`);
  }
}
