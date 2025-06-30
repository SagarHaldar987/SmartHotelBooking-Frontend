// Role Guard Implementation in Angular
// This guard checks if the user has the required role to access a route.
// Safe for SSR (Server-Side Rendering)
// src/app/role-guard.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = this.authService.getRole();

    if (userRole === expectedRole) {
      return true;
    } else {
      // ✅ Only show alert in browser (not during SSR)
      if (isPlatformBrowser(this.platformId)) {
        alert('Access denied. You do not have permission to view this page.');
      }

      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}










// // Role Guard Implementation in Angular
// // This guard checks if the user has the required role to access a route.
// // src/app/role-guard.ts
// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
// import { AuthService } from './services/auth/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoleGuard implements CanActivate {

//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     const expectedRole = route.data['expectedRole'];
//     const userRole = this.authService.getRole();

//     if (userRole === expectedRole) {
//       return true;
//     } else {
//       alert('Access denied. You do not have permission to view this page.');
//       this.router.navigate(['/unauthorized']);
//       return false;
//     }
//   }
// }









// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
// import { AuthService } from './services/auth/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoleGuard implements CanActivate {

//   constructor(
//     private authService: AuthService,
//    private snackBar: MatSnackBar,
//    private router: Router
//   ) {}

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     const expectedRole = route.data['expectedRole'];
//     const userRole = this.authService.getRole();

//     if (userRole === expectedRole) {
//       return true;
//     } else {
//       this.snackBar.open('Access denied. You do not have permission to view this page.', 'Close', {
//         duration: 3000
//       });
//       this.router.navigate(['/unauthorized']);
//       return false;
//     }
//   }
// }