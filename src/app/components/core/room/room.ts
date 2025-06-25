// src/app/components/room/room.component.ts
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private roomService: RoomService, private cdr : ChangeDetectorRef) {}

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
}




// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { RoomService, Room } from '../../../services/room/room.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-room',
//   templateUrl: './room.html',
//   styleUrls: ['./room.css'],
//   imports: [CommonModule]
// })
// export class RoomComponent implements OnInit {
//   rooms: Room[] = [];
//   hotelID!: number;

//   constructor(private route: ActivatedRoute, private roomService: RoomService) {}

//   ngOnInit(): void {
//     this.hotelID = +this.route.snapshot.paramMap.get('hotelID')!;
//     this.roomService.getRoomsByHotelId(this.hotelID).subscribe(data => {
//       this.rooms = data;
//       console.log('Rooms fetched successfully:', this.rooms);
//     });
//   }

// }