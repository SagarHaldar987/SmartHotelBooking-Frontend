// src/app/component/login/login.ts -->
 
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
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
            this.router.navigate(['/admin-dashboard']);
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
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../../services/auth/auth.service';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   imports: [
//     FormsModule,
//     RouterModule
//   ],
//   templateUrl: './login.html'
// })

// export class Login {
//   credentials = {
//     email: '',
//     password: ''
//   };

//   constructor(private authService: AuthService, private router: Router) {}

//   onSubmit(): void {
//     this.authService.login(this.credentials).subscribe({
//       next: (response: any) => {
//         if (response.token) {
//           this.authService.saveUserData(response);

//           // Role-based navigation
//           if (response.role === 'Manager') {
//             this.router.navigate(['/manager-dashboard']);
//           } else if (response.role === 'User') {
//             this.router.navigate(['/home']);
//           } else {
//             this.router.navigate(['/']);
//           }
//         }
//       },
//       error: (err) => {
//         console.error('Login failed:', err);
//         alert('Invalid credentials or server error.');
//       }
//     });
//   }
// }
