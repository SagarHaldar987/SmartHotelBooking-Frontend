import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})

export class Navbar implements OnInit, OnDestroy {
  isLoggedIn = false;
  role = '';
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const loginSub = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    const roleSub = this.authService.role$.subscribe(role => {
      this.role = role;
    });

    this.subscriptions.push(loginSub, roleSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  goToHotels() {
    this.router.navigate([this.isLoggedIn ? '/hotel' : '/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}