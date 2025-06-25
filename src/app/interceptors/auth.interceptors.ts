// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private cookieService: CookieService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.cookieService.get('token');
//     console.log('AuthInterceptor: Attaching token', token);

//     if (token) {
//       const cloned = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return next.handle(cloned); // ✅ Correctly handle the cloned request
//     }

//     return next.handle(req); // ✅ Handle the original request if no token is found
//   }
// }





// // // src/app/interceptors/auth.interceptor.ts
// // import { HttpInterceptorFn } from '@angular/common/http';
// // import { inject } from '@angular/core';
// // import { CookieService } from 'ngx-cookie-service';

// // export const authInterceptor: HttpInterceptorFn = (req, next) => {
// //   const cookieService = inject(CookieService);
// //   const token = cookieService.get('token');

// //   // Check if the token exists in cookies
// //   console.log('AuthInterceptor: Attaching token', token);

// //   if (token) {
// //     const cloned = req.clone({
// //       setHeaders: {
// //         Authorization: `Bearer ${token}`
// //       }
// //     });
// //     return next(cloned);
// //   }

// //   return next(req);
// // };

// src/app/interceptors/auth.interceptor.ts
// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');

  console.log('AuthInterceptor is running');
  // console.log('Token from cookie:', token);

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
