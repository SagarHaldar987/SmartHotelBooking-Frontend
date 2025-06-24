import { Routes } from '@angular/router';
import { Registration } from './components/registration/registration';
import { Login } from './components/login/login';
import { UserDashboard } from './components/user/user-dashboard/user-dashboard';
import { ManagerDashboard } from './components/manager-dashboard/manager-dashboard';
// import { AuthGuard } from './auth-guard';
import { Home } from './components/core/home/home';
import { Hotel } from './components/core/hotel/hotel';
import { profile } from 'console';
import { Profile } from './components/core/profile/profile';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: Home },
  { path: 'register', component: Registration },
  { path: 'login', component: Login },
  { path: 'user-dashboard', component: UserDashboard},
  { path: 'manager-dashboard', component: ManagerDashboard},
  {path: 'hotel', component: Hotel},
  {path: 'profile', component: Profile},
  { path: '**', redirectTo: '/home' },
];
