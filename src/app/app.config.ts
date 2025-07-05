// src/app/app.config.ts
// Import Angular's core providers and types
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';

// Provide routing capabilities
import { provideRouter } from '@angular/router';

// Provide HTTP Client and Interceptors
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Import your route definitions
import { routes } from './app.routes';

// For hydration in SSR or event replay for resumability
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// Import your custom interceptor
import { authInterceptor } from './interceptors/auth.interceptors';

// CookieService is used to read/write cookies
import { CookieService } from 'ngx-cookie-service';

// ✅ Main App Configuration Object
export const appConfig: ApplicationConfig = {
  providers: [
    // 🍪 Makes CookieService available across your app
    CookieService,

    // 🌐 Attaches global error listeners for browser (e.g., console error capturing)
    provideBrowserGlobalErrorListeners(),

    // ⚡ Improves performance by using zoneless change detection (experimental)
    provideZonelessChangeDetection(),

    // 🧭 Register routes for your app
    provideRouter(routes),

    // ♻️ Enables hydration (for server-side rendering or resumability in Angular)
    provideClientHydration(withEventReplay()),

    // 🌐 Registers Angular's HttpClient with your custom interceptor
    provideHttpClient(
      withInterceptors([
        authInterceptor // ✅ Your auth interceptor adds the JWT token
      ])
    )
  ]
};












// import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// import { authInterceptor } from './interceptors/auth.interceptors';
// import { CookieService } from 'ngx-cookie-service';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     CookieService,
//     provideBrowserGlobalErrorListeners(),
//     provideZonelessChangeDetection(),
//     provideRouter(routes),
//     provideClientHydration(withEventReplay()),
//     provideHttpClient(withInterceptors([authInterceptor]))
//   ]
// };
