// src/app/services/hotel.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
      return this.http.get<Hotel[]>(`${environment.apiBaseUrl}/Hotels`,{withCredentials: true});
  }

  // getAllHotels(): Observable<Hotel[]> {
  //   return this.http.get<Hotel[]>('/api/Hotels'); // Replace with your actual API endpoint
  // }

  // // Method to get a hotel by ID
  // getHotelById(hotelID: number): Observable<Hotel> {
  //     return this.http.get<Hotel>(`${environment.apiBaseUrl}/Hotels/${hotelID}`);
  // }
  // // Method to add a new hotel
  // addHotel(hotel: Hotel): Observable<Hotel> {
  //     return this.http.post<Hotel>(`${environment.apiBaseUrl}/Hotels`, hotel);
  // }
  // // Method to update an existing hotel
  // updateHotel(hotel: Hotel): Observable<Hotel> {
  //     return this.http.put<Hotel>(`${environment.apiBaseUrl}/Hotels/${hotel.hotelID}`, hotel);
  // }
  // // Method to delete a hotel
  // deleteHotel(hotelID: number): Observable<void> {
  //     return this.http.delete<void>(`${environment.apiBaseUrl}/Hotels/${hotelID}`);
  // }
  // // Method to search hotels by name
  // searchHotelsByName(name: string): Observable<Hotel[]> {
  //     return this.http.get<Hotel[]>(`${environment.apiBaseUrl}/Hotels/search?name=${name}`);
  // }
}
