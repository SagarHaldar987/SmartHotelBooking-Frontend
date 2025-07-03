import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="mt-4 text-center text-info fs-5">📄 This is All User Information Data</div>`
})
export class UserData {}
