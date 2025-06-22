import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = 'http://localhost:7050/api/Auth'; // Base URL for the API

  constructor(private http: HttpClient) {}

  // Register Method
  // register(userData: any): Observable<any> {
  //   console.log('Register API called with data:', userData); // Log the input data
  //   return this.http.post(`${this.baseUrl}/api/Auth/register`, userData).pipe(
  //     tap(response => console.log('API Response:', response)), // Log the response
  //     catchError(error => {
  //       console.error('API Error:', error); // Log any errors
  //       throw error;
  //     })
  //   );
  // }
  register(userData: any): Observable<any> {
    console.log('Register API called with data:', userData); // Log the input data
    return this.http.post(`${this.baseUrl}/register`, userData);
  }



  // ✅ Login Method (Commented for now)
  /*
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
  */

  // ✅ Decode JWT Token
  // decodeToken(token: string): any {
  //   try {
  //     const payload = token.split('.')[1];
  //     const decoded = atob(payload); // base64 decode
  //     return JSON.parse(decoded);
  //   } catch (e) {
  //     return null;
  //   }
  // }
}