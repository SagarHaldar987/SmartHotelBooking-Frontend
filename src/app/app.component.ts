import { Component } from '@angular/core';
import { RegistrationComponent } from './components/registration/registration.component';

@Component({
  selector: 'app-root',
  imports: [RegistrationComponent],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected title = 'Frontend';
}




// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class AppComponent {
//   protected title = 'Frontend';
// }