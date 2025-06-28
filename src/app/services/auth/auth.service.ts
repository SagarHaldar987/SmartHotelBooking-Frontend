// AuthService for handling user authentication
// This service manages user registration, login, and session state using cookies.
// It uses Angular's HttpClient for API calls and ngx-cookie-service for cookie management.
// It also provides observables for components to reactively check login status and user role.
// The service is provided in the root injector, making it available throughout the application.
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn: BehaviorSubject<boolean>;
  private role: BehaviorSubject<string>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    // ✅ Initialize BehaviorSubjects after cookieService is available
    this.loggedIn = new BehaviorSubject<boolean>(this.cookieService.check('token'));
    this.role = new BehaviorSubject<string>(this.cookieService.get('role') || '');
  }

  // Observable streams for components to subscribe to
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get role$(): Observable<string> {
    return this.role.asObservable();
  }

  // Register method
  register(userData: any): Observable<any> {
    console.log('Register API called with data:', userData);
    return this.http.post(`${environment.apiBaseUrl}/Auth/register`, userData).pipe(
      tap(response => console.log('API Response:', response)),
      catchError(error => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }

  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/Auth/login`, credentials);
  }

  // Save user data and update state
  saveUserData(data: any): void {
    this.cookieService.set('token', data.token);
    this.cookieService.set('role', data.role);
    this.cookieService.set('name', data.name);
    this.cookieService.set('email', data.email);
    this.cookieService.set('userId', data.userId);

    this.loggedIn.next(true);
    this.role.next(data.role);
  }


  // Get role from cookie
  getRole(): string | null {
    return this.cookieService.get('role');
  }


  // Get UserId from Cookie
  getUserId(): number {
    const userId = this.cookieService.get('userId');
    console.log("Fetched userId from cookie:", userId); // ✅ Debug
    return userId ? +userId : 0;
  }


  // Check login status
  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  // Logout and update state
  logout(): void {
    this.cookieService.deleteAll();
    this.loggedIn.next(false);
    this.role.next('');
  }
}