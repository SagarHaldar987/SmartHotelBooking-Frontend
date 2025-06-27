// src/app/services/hotel.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Hotel {
  hotelID: number;
  name: string;
  location: string;
  managerID: number;
  amenities: string;
  rating: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private http: HttpClient) {}

  // Method to get all hotels
  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${environment.apiBaseUrl}/Hotels`, { withCredentials: true });
  }
  
  // getAllHotels(): Observable<Hotel[]> {
  //     return this.http.get<Hotel[]>(`${environment.apiBaseUrl}/Hotels`,{withCredentials: true});
  // }
}
