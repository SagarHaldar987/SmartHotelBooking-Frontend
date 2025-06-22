import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7050/api/Auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // ✅ Login Method (Commented for now)
  /*
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
  */

  // ✅ Decode JWT Token
  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload); // base64 decode
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  }
}

