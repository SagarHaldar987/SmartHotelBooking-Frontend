import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class Registration implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    role: 'User' // Default role set here
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    // Send the form data with role=User
    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        alert('✅ Registration successful!');
        console.log(res);
        this.router.navigate(['/login']); // Redirect to Login
      },
      error: (err: any) => {
        alert('❌ Registration failed!');
        console.error(err);
      }
    });
  }
}
