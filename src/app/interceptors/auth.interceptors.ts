// src/app/interceptors/auth.interceptor.ts
// Import required Angular modules
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; // Import ngx-cookie-service to read cookies from the browser

// Define a functional HTTP interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService); // 🔍 Use Angular's inject() to get an instance of CookieService
  
  const token = cookieService.get('token'); // 🍪 Read the JWT token stored in the cookie named 'token'

  // ✅ If the token exists, clone the request and add the Authorization header
  if (token) {
    const cloned = req.clone({
      setHeaders: {        
        Authorization: `Bearer ${token}` // Attach token in standard format: Authorization: Bearer <token>
      }
    });
    
    return next(cloned);  // 🔄 Pass the modified request to the next handler in the chain
  }
  
  return next(req); // ❌ If token does not exist, send the original request as-is
};










// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const cookieService = inject(CookieService);
//   const token = cookieService.get('token');
//   if (token) {
//     const cloned = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return next(cloned);
//   }
//   return next(req);
// };