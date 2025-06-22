import { Routes } from '@angular/router';
import { Registration } from './components/registration/registration';
import { Login } from './components/login/login';
import { UserDashboard } from './components/user-dashboard/user-dashboard';
import { ManagerDashboard } from './components/manager-dashboard/manager-dashboard';
// import { Unauthorized } from './components/unauthorized/unauthorized';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: Registration },
  { path: 'login', component: Login },
  { path: 'user-dashboard', component: UserDashboard },
  { path: 'manager-dashboard', component: ManagerDashboard }
];
