import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [RouterOutlet, FormsModule]  // ✅ No HttpClientModule or providers here
})
export class App {
  title = 'SmartHotelManagement';
}
