// // src/app/app.config.ts
// import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
// import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// import { AuthInterceptor } from './interceptors/auth.interceptors';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideBrowserGlobalErrorListeners(),
//     provideZonelessChangeDetection(),
//     provideRouter(routes),
//     provideClientHydration(withEventReplay()),
//     provideHttpClient(withInterceptorsFromDi()),
//     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
//   ]
// };


// // src/app/app.config.ts
// // src/app/app.config.ts
// // import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// // import { provideRouter } from '@angular/router';
// // import {
// //   HTTP_INTERCEPTORS,
// //   provideHttpClient,
// //   withInterceptorsFromDi
// // } from '@angular/common/http';
// // import { routes } from './app.routes';
// // import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// // import { AuthInterceptor } from './interceptors/auth.interceptors';

// // export const appConfig: ApplicationConfig = {
// //   providers: [
// //     provideBrowserGlobalErrorListeners(),
// //     provideRouter(routes),
// //     provideClientHydration(withEventReplay()),
// //     provideHttpClient(withInterceptorsFromDi()),
// //     {
// //       provide: HTTP_INTERCEPTORS,
// //       useClass: AuthInterceptor,
// //       multi: true
// //     }
// //   ]
// // };

// src/app/app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authInterceptor } from './interceptors/auth.interceptors';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    CookieService,
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
