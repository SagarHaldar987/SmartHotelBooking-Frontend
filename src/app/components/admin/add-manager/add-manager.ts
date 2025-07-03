import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-manager.html',
  styleUrls: ['./add-manager.css']
})
export class AddManager {
  managerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.managerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      contactNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.managerForm.valid) {
      const data = {
        ...this.managerForm.value,
        role: 'Manager'
      };

      this.http.post('http://localhost:5281/api/Managers/register', data).subscribe({
        next: (res: any) => {
          alert(res.message);
          console.log('Manager Registered:', res);
          this.router.navigate(['/admin-dashboard']);
        },
        error: (err) => {
          console.error('Registration Failed:', err);
          alert('Something went wrong');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
}
