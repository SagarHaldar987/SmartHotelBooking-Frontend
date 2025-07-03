import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService, User } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-user.html',
  styleUrls: ['./update-user.css']
})
export class UpdateUser implements OnInit {
  userId: number = 0;
  user: User = {
    userID: 0,
    name: '',
    email: '',
    role: 'User',
    contactNumber: ''
  };
  password: string = ''; // Required by backend

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('userId')!;
    this.fetchUser();
  }

  fetchUser(): void {
    this.adminService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
        console.log('Fetched User Data:', data);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

  onUpdateUser(): void {
    const updatedUser = {
      name: this.user.name,
      email: this.user.email,
      password: '12121212', // Static password as per your Swagger example
      role: this.user.role,
      contactNumber: this.user.contactNumber
    };

    this.adminService.updateUser(this.userId, updatedUser).subscribe({
      next: (res) => {
        alert('✅ User Updated Successfully!');
        console.log('Updated User:', updatedUser);
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        console.error('Update Error:', err);
        alert('❌ Failed to update user.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }
}
