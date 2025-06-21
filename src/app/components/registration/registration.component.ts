import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/auth.service';
import { RegisterDTO } from '../../models/user.model';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: RegisterDTO = {
    name: '',
    email: '',
    role: '',
    contactNumber: '',
    password: ''
  };

  // constructor(private authService: AuthService) {}

  onSubmit() {

    // this.authService.registerUser(this.user).subscribe({
    //   next: (response) => {
    //     console.log('User registered successfully:', response);
    //   },
    //   error: (error) => {
    //     console.error('Registration failed:', error);
    //   }
    // });



    // Temporary version without Backend service
    console.log('User registered:', this.user);
    // Reset the form after submission  
    
  }
}
