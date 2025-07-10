// src/app/services/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Room {
  roomID: number;
  hotelID: number;
  managerID: number;
  type: string;
  price: number;
  availability: boolean;
  features: string;
  imageUrl?: string;
}

export interface CreateRoom {
  hotelID: number;
  managerID: number;
  type: string;
  price: number;
  availability: boolean;
  features: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {}

  getRoomsByHotelId(hotelID: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.apiBaseUrl}/Rooms/hotel/${hotelID}`);
  }

  getRoomById(roomID: number): Observable<Room> {
    return this.http.get<Room>(`${environment.apiBaseUrl}/Rooms/${roomID}`);
  } 

  addRoom(room: CreateRoom): Observable<Room> {
    return this.http.post<Room>(`${environment.apiBaseUrl}/Rooms`, room);
  }

  // delete(roomID: number): Observable<any> {
  //   return this.http.delete(`${environment.apiBaseUrl}/Rooms/${roomID}`);
  // }

}