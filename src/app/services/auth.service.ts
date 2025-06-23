import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
   // this.loadUserRoleOnAppInit();
  }
  
  
  // ✅ Register Method
  register(userData: any): Observable<any> {
    console.log('Register API called with data:', userData); // Log the input data
    return this.http.post(`${environment.apiBaseUrl}/Auth/register`, userData).pipe(
      tap(response => console.log('API Response:', response)), // Log the response
      catchError(error => {
        console.error('API Error:', error); // Log any errors
        throw error;
      })
    );
  }

  // ✅ Login Method (Commented for now)
  login(credentials: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/login`, credentials);
  }
  

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