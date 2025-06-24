import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  isLoggedIn = false;
  role = '';
  name = '';
  email = '';

  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.check('token');
    this.name = this.cookieService.get('name');
    this.email = this.cookieService.get('email');
    this.role = this.cookieService.get('role');
  }

  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/home']);
  }
}