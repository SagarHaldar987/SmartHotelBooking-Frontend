import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
    userID: number;
    name: string;
    email: string;
    role: string;
    contactNumber: string;
}

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(private http: HttpClient) { }

    // ✅ Get all users (Admin only)
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiBaseUrl}/User`);
    }


    deleteUser(userId: number): Observable<any> {
        return this.http.delete(`${environment.apiBaseUrl}/User/${userId}`);
    }

    // Get user by ID
    getUserById(userId: number): Observable<User> {
        return this.http.get<User>(`${environment.apiBaseUrl}/User/${userId}`);
    }

    // Update user
    updateUser(userId: number, data: any): Observable<any> {
        return this.http.put(`${environment.apiBaseUrl}/User/${userId}`, data);
    }

}
