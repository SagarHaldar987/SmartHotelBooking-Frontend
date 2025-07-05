// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// ✅ Bootstrap your app with the root component and config
bootstrapApplication(App, appConfig);
