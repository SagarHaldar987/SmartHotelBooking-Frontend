import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports:[CommonModule, RouterModule]
})

export class Navbar {
  isLoggedIn = false;
  role = '';

  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.check('token');
    this.role = this.cookieService.get('role');
  }

  goToHotels() {
    if (this.isLoggedIn) {
      this.router.navigate(['/hotel']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  } 
}