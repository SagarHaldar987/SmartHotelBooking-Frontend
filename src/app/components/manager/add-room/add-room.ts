// src/app/components/manager/add-room/add-room.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService, CreateRoom } from '../../../services/room/room.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.html',
  styleUrls: ['./add-room.css'],
  imports:[CommonModule, FormsModule]
})

export class AddRoomComponent implements OnInit {
  hotelId: number = 0;
  managerId: number = 0;
  type: string = '';
  price: number = 0;
  availability: boolean = true;
  features: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.hotelId = +params['hotelId'];
      this.managerId = +params['managerId'];

      console.log('💡 Parsed Hotel ID:', this.hotelId);
      console.log('💡 Parsed Manager ID:', this.managerId);
    });
  }

  addRoom(): void {
    const newRoom: CreateRoom = {
      hotelID: this.hotelId,
      managerID: this.managerId,
      type: this.type,
      price: this.price,
      availability: this.availability,
      features: this.features
    };

    console.log('Creating room with data:', newRoom);

    this.roomService.addRoom(newRoom).subscribe({
      next: (room) => {
        console.log('✅ Room created successfully:', room);
        alert('Room created successfully!');
        this.router.navigate(['/rooms', this.hotelId]);
      },
      error: (err) => {
        console.error('❌ Error creating room:', err);
        alert('Something went wrong!');
      }
    });
  }
}