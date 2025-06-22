import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class Registration {
  user = {
    name: '',
    email: '',
    password: '',
    role: 'User',
    contactNumber: ''
  };

  // 👇👇👇👇👇👇👇👇 Make Uncomment - When Cors is Added and Backend is Connect with Frontend Successfully 👇👇👇👇👇👇👇👇
  // constructor(private authService: AuthService) {}

  onSubmit() {
    // 👇👇👇👇👇👇👇👇 Make Uncomment - When Cors is Added and Backend is Connect with Frontend Successfully 👇👇👇👇👇👇👇👇
    console.log('Sending data:', this.user);

    // this.authService.register(this.user).subscribe({
    //   next: (res) => {
    //     alert('Registration successful!');
    //     console.log(res);
    //   },
    //   error: (err) => {
    //     alert('Registration failed!');
    //     console.error(err);
    //   }
    // });


    // ✅ Temporary version without backend- Remove Later
    alert('Submitted! (Fake)');
    console.log('User data:', this.user);
  }
}









// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/auth.service';
// import { provideHttpClient } from '@angular/common/http'; // ✅ Add this

// @Component({
//   selector: 'app-registration',
//   standalone: true,
//   templateUrl: './registration.html',
//   styleUrls: ['./registration.css'],
//   imports: [FormsModule, CommonModule],
//   providers: [provideHttpClient()] // ✅ 👈 This line is the FIX!
// })
// export class Registration {
//   user = {
//     name: '',
//     email: '',
//     password: '',
//     role: 'User',
//     contactNumber: ''
//   };

//   constructor(private authService: AuthService) {}

//   onSubmit() {
//     this.authService.register(this.user).subscribe({
//       next: (res) => {
//         alert('Registration successful!');
//         console.log(res);
//       },
//       error: (err) => {
//         alert('Registration failed!');
//         console.error(err);
//       }
//     });
//   }
// }






// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-registration',
//   standalone: true, // ✅ Needed for standalone component
//   templateUrl: './registration.html',
//   styleUrls: ['./registration.css'],
//   imports: [FormsModule, CommonModule] // ✅ Needed for ngModel and form handling
// })
// export class Registration {
//   user = {
//     name: '',
//     email: '',
//     password: '',
//     role: 'User',
//     contactNumber: ''
//   };

//   constructor(private authService: AuthService) {}

//   onSubmit() {
//     this.authService.register(this.user).subscribe({
//       next: (res) => {
//         alert('Registration successful!');
//         console.log(res);
//       },
//       error: (err) => {
//         alert('Registration failed!');
//         console.error(err);
//       }
//     });
//   }
// }
