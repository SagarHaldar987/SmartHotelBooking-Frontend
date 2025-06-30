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
  constructor(private http: HttpClient) { }

  // Method to get all hotels
  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${environment.apiBaseUrl}/Hotels`, { withCredentials: true });
  }

  // Method to add Hotel by Manager Only
  addHotel(formData: FormData, managerID: number): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/Hotels/manager/${managerID}`, formData, {
      withCredentials: true,
    });
  }

  // Method to get all hotels created by the LoggedIn Manager Only.
  getHotelsByManagerId(managerID: number): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${environment.apiBaseUrl}/Hotels/manager/${managerID}`, {
      withCredentials: true,
    });
  }

  // Method to delete a hotel by ID and Manager ID
  deleteHotel(hotelID: number, managerID: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/Hotels/${hotelID}/manager/${managerID}`, {
      withCredentials: true,
    });
  }

  // Method to update a hotel by ID and Manager ID
  updateHotel(hotelID: number, managerID: number, hotelData: any): Observable<any> {
    return this.http.put(
      `${environment.apiBaseUrl}/Hotels/${hotelID}/manager/${managerID}`,
      hotelData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Method to get a Hotel by it's ID.
  getHotelById(hotelID: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${environment.apiBaseUrl}/Hotels/${hotelID}`, {
      withCredentials: true
    });
  }

}
