// src/app/components/core/homr/home.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  userRole: string = '';
  constructor(private router: Router, private authService: AuthService) {
    this.userRole = this.authService.getRole() || ''; // 🔥 Get role from cookie
  }

  handleBooking() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/hotel']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
