// src/app/services/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Room {
  roomID: number;
  hotelID: number;
  type: string;
  price: number;
  availability: boolean;
  features: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {}

  getRoomsByHotelId(hotelID: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.apiBaseUrl}/Rooms/hotel/${hotelID}`);
  }

  // getRoomById(roomID: number): Observable<Room> {
  //   return this.http.get<Room>(`${environment.apiBaseUrl}/Rooms/${roomID}`);
  // } 

  // addRoom(room: Room): Observable<Room> {
  //   return this.http.post<Room>(`${environment.apiBaseUrl}/Rooms`, room);
  // }

  // updateRoom(room: Room): Observable<Room> {
  //   return this.http.put<Room>(`${environment.apiBaseUrl}/Rooms/${room.roomID}`, room);
  // }

  // deleteRoom(roomID: number): Observable<void> {
  //   return this.http.delete<void>(`${environment.apiBaseUrl}/Rooms/${roomID}`);
  // }

}
