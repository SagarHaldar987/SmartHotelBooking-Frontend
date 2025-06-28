// This file defines an authentication guard for Angular routes.
// It checks if the user is logged in before allowing access to certain routes.
// If the user is not authenticated, it redirects them to the login page.
// src/app/auth-guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // Redirect to login if not authenticated
      alert('You must be logged in to access this page.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}