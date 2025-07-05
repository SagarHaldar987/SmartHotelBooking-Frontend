// Description: This file defines the routes for the Angular application, mapping paths to components.
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Registration } from './components/registration/registration';
import { Login } from './components/login/login';
import { MyBookings } from './components/user/my-bookings/my-bookings';
import { ManagerDashboard } from './components/manager/manager-dashboard/manager-dashboard';
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
import { UpdateHotel } from './components/manager/update-hotel/update-hotel';
import { Reviews } from './components/core/review/review';
import { AddManager } from './components/admin/add-manager/add-manager';
import { AdminDashboard } from './components/admin/admin-dashboard/admin-dashboard';
import { UpdateUser } from './components/admin/update-user/update-user';


export const routes: Routes = [

  // Routes accesible to All type of Users.
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'register', component: Registration },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile },
  { path: 'hotel', component: HotelComponent },
  { path: 'rooms/:hotelID', component: RoomComponent },
  { path: 'hotel-reviews/:hotelID', component: Reviews },

  // Routes Accesible to User : Customer
  { path: 'my-bookings', component: MyBookings, canActivate: [RoleGuard], data: { expectedRole: 'User' } },
  { path: 'bookings/:roomID', component: BookingsComponent, canActivate: [RoleGuard], data: { expectedRole: 'User' } },
  { path: 'add-booking-details', component: AddBookingDetails, canActivate: [RoleGuard], data: { expectedRole: 'User' } },
  { path: 'payment', component: Payment, canActivate: [RoleGuard], data: { expectedRole: 'User' } },
 
  // Routes Accessible to Manager Only.
  { path: 'add-hotel', component: AddHotel, canActivate: [RoleGuard], data: { expectedRole: 'Manager' } },
  { path: 'manager-dashboard', component: ManagerDashboard, canActivate: [RoleGuard], data: { expectedRole: 'Manager' } },
  { path: 'add-room', component: AddRoomComponent, canActivate: [RoleGuard], data: { expectedRole: 'Manager' } },
  { path: 'update-hotel', component: UpdateHotel },

  // Routes Accessible to Admin Only.
  { path: 'admin-dashboard', component: AdminDashboard, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
  { path: 'add-manager', component: AddManager, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
  { path: 'update-user/:userId', component: UpdateUser, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },

  // On Trying to access any UnAuthorized route, then re-direct to PageNotFound Page.
  { path: '**', component: PageNotFound },

];