import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.html'
})

export class Login {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        if (response.token) {
          this.authService.saveUserData(response);

          // Role-based navigation
          if (response.role === 'Manager') {
            this.router.navigate(['/manager-dashboard']);
          } else if (response.role === 'User') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid credentials or server error.');
      }
    });
  }
}














// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router'; 
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.html',
//   styleUrls: ['./login.css'],
//   imports: [FormsModule, CommonModule, RouterModule]
// })
// export class Login {
//   credentials = {
//     email: '',
//     password: ''
//   };

//   constructor(
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   onSubmit() {
//     // ✅ MOCK Response from backend
//     const mockResponse = {
//       message: 'Login successful',
//       name: 'John Doe', // You can replace this with dynamic input if needed
//       email: this.credentials.email, // Use user input from the form
//       // role: this.credentials.email === 'manager@example.com' ? 'Manager' : 'User', // Mock role based on email
//       role: this.credentials.email,
//       token: 'FAKE.JWT.TOKEN'
//     };

//     // ✅ Save JWT token to localStorage or cookie
//     document.cookie = `jwt=${mockResponse.token}; path=/`;
//     // OR
//     // localStorage.setItem('jwt', mockResponse.token);

//     // ✅ (Mock) Decode token
//     const tokenPayload = this.authService.decodeToken(mockResponse.token);
//     const role = tokenPayload.role;

//     // const role = mockResponse.role; // Replace with tokenPayload.role when backend is ready

//     alert(`Login successful ✅ Logged in as ${role}`);
//     this.navigateBasedOnRole(role);

//     // ✅ ACTUAL API CALL (when backend is ready)
//     this.authService.login(this.credentials).subscribe((res) => {
//       localStorage.setItem('jwt', res.token);
//       const decoded = this.authService.decodeToken(res.token);
//       const role = decoded.role;
//       this.navigateBasedOnRole(role);
//     });
//   }

//   navigateBasedOnRole(role: string) {
//     if (role === 'User') {
//       this.router.navigate(['/user-dashboard']);
//     } else if (role === 'Manager') {
//       this.router.navigate(['/manager-dashboard']);
//     } else {
//       this.router.navigate(['/unauthorized']);
//     }
//   }
// }
