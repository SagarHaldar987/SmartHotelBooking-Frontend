import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDTO } from '../models/user.model';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})

export class AuthService {
private baseUrl = 'http://localhost:7050/api';
 
  constructor(private http: HttpClient) {}
 
  registerUser(userData: RegisterDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/Auth/register`, userData);
  }
}