import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, User } from '../../../services/admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-data.html',
  styleUrls: ['./user-data.css']
})
export class UserData implements OnInit {
  users: User[] = [];

  constructor(private adminService: AdminService, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Fetched Users:', data);
        this.cd.detectChanges(); // 👈 Force Angular to re-render the view
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  onDelete(user: User) {
    if (confirm(`Are you sure you want to delete user with ID: ${user.userID}?`)) {
      this.adminService.deleteUser(user.userID).subscribe({
        next: () => {
          alert(`User with ID ${user.userID} deleted successfully.`);
          console.log(`Deleted user with ID ${user.userID}`);
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user.');
        }
      });
    }
  }

  onUpdate(user: User) {
    console.log('📝 Update clicked for User ID:', user.userID);
    this.router.navigate(['/update-user', user.userID]);
  }
}
