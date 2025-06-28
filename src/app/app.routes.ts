// Description: This file defines the routes for the Angular application, mapping paths to components.
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Registration } from './components/registration/registration';
import { Login } from './components/login/login';
import { MyBookings } from './components/user/my-bookings/my-bookings';
import { ManagerDashboard } from './components/manager/manager-dashboard/manager-dashboard';
import { AuthGuard } from './auth-guard';
import { RoleGuard } from './role-guard';
import { Home } from './components/core/home/home';
import { HotelComponent } from './components/core/hotel/hotel';
import { Profile } from './components/core/profile/profile';
import { RoomComponent } from './components/core/room/room';
import { AddHotel } from './components/manager/add-hotel/add-hotel';
import { PageNotFound } from './components/core/page-not-found/page-not-found';
import { BookingsComponent } from './components/user/bookings/bookings';
import { AddBookingDetails } from './components/user/bookings/add-booking-details/add-booking-details';
import { Payment } from './components/user/payment/payment';
import { AddRoomComponent } from './components/manager/add-room/add-room';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'register', component: Registration },
  { path: 'login', component: Login },
  { path: 'my-bookings', component: MyBookings },
  { path: 'manager-dashboard', component: ManagerDashboard },
  { path: 'hotel', component: HotelComponent }, // Assuming authGuard is defined in your auth-guard file
  { path: 'rooms/:hotelID', component: RoomComponent }, // Lazy loading rooms module
  { path: 'bookings/:roomID', component: BookingsComponent },
  { path: 'profile', component: Profile },
  { path: 'add-booking-details', component: AddBookingDetails },
  { path: 'payment', component: Payment },
  {
    path: 'add-hotel',
    component: AddHotel,
    canActivate: [RoleGuard],
    data: { expectedRole: 'Manager' }
  },
  { path: 'add-room', component: AddRoomComponent, canActivate: [RoleGuard], data: { expectedRole: 'Manager' } },
  { path: '**', component: PageNotFound },
];






