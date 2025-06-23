import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
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
  login(credentials: {email: string; password: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/Auth/login`, credentials);
  }
  
  
  saveUserData(data: any): void {
      this.cookieService.set('token', data.token);
      this.cookieService.set('role', data.role);
      this.cookieService.set('name', data.name);
      this.cookieService.set('email', data.email);
      this.cookieService.set('userId', data.userId);
  }
  
  
  getRole(): string | null {
    return this.cookieService.get('role');
  }
  
  
  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }
  
  logout(): void {
    this.cookieService.deleteAll();
  } 
  
}