import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from "./components/core/navbar/navbar";
import { Footer } from "./components/core/footer/footer";
// import {SwiperModule} from "swiper/angular"; // Import SwiperModule if needed


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [
    RouterOutlet, 
    FormsModule, 
    Navbar, 
    Footer
    // SwiperModule
  ]
})
export class App {
  title = 'SmartHotelManagement';
}
