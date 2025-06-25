
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router, private authService: AuthService) {}

  handleBooking() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/hotel']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
