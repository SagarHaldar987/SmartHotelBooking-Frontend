import 'zone.js';  // Required for Angular
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

// bootstrapApplication(App,appConfig); {
//   providers: [
//     provideHttpClient(withFetch()),
//     provideRouter(routes)
//   ]
// });

bootstrapApplication(App, appConfig);

