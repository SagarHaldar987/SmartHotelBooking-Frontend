import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class Login {
  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router
    // private authService: AuthService
  ) {}

  onSubmit() {
    // ✅ MOCK Response from backend
    const mockResponse = {
      message: 'Login successful',
      name: 'Sagar',
      email: 'sagar@example.com',
      role: 'Manager', // Change to 'User' to test different routes
      token: 'FAKE.JWT.TOKEN'
    };

    // ✅ Save JWT token to localStorage or cookie
    // document.cookie = `jwt=${mockResponse.token}; path=/`;
    // OR
    localStorage.setItem('jwt', mockResponse.token);

    // ✅ (Mock) Decode token
    // const tokenPayload = this.authService.decodeToken(mockResponse.token);
    // const role = tokenPayload.role;

    const role = mockResponse.role; // Replace with tokenPayload.role when backend is ready

    alert(`Login successful ✅ Logged in as ${role}`);
    this.navigateBasedOnRole(role);

    // ✅ ACTUAL API CALL (when backend is ready)
    /*
    this.authService.login(this.credentials).subscribe((res) => {
      localStorage.setItem('jwt', res.token);
      const decoded = this.authService.decodeToken(res.token);
      const role = decoded.role;
      this.navigateBasedOnRole(role);
    });
    */
  }

  navigateBasedOnRole(role: string) {
    if (role === 'User') {
      this.router.navigate(['/user-dashboard']);
    } else if (role === 'Manager') {
      this.router.navigate(['/manager-dashboard']);
    } else {
      this.router.navigate(['/unauthorized']);
    }
  }
}
