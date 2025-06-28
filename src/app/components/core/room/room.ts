// src/app/components/room/room.component.ts
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService, Room } from '../../../services/room/room.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room',
  templateUrl: './room.html',
  styleUrls: ['./room.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class RoomComponent implements OnInit, OnDestroy {
  rooms: Room[] = [];
  hotelID!: number;
  private roomSub!: Subscription;

  constructor(private route: ActivatedRoute, private roomService: RoomService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.hotelID = +this.route.snapshot.paramMap.get('hotelID')!;
    this.roomSub = this.roomService.getRoomsByHotelId(this.hotelID).subscribe(data => {
      this.rooms = data;
      console.log('Rooms fetched successfully:', this.rooms);
      this.cdr.markForCheck(); // Ensure change detection runs
    });
  }

  ngOnDestroy(): void {
    if (this.roomSub) {
      this.roomSub.unsubscribe();
    }
  }

  trackByRoomId(index: number, room: Room): number {
    return room.roomID;
  }


  bookRoom(roomID: number): void {
    this.router.navigate(['/bookings', roomID]);
  }

  // Helper Method to add ROOM Image
  getRoomImage(type: string): string {
    switch (type.toLowerCase()) {
      case 'single':
        return '/assets/RoomsImage/SingleRoom.jpeg';
      case 'double':
        return '/assets/RoomsImage/DoubleRoom.jpg';
      case 'family':
        return '/assets/RoomsImage/FamilyRoom.jpeg';
      case 'deluxe':
        return '/assets/RoomsImage/DeluxeRoom.jpeg';
      default:
        return '/assets/RoomsImage/default.jpeg'; // Optional: Add a fallback image
    }
  }
}