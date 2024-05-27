import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet ,RouterModule} from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { BookAppointnetComponent } from '../components/book-appointment/book-appointment.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RegisterComponent,HttpClientModule,BookAppointnetComponent,NavbarComponent,RouterModule],
  templateUrl: './app.component.html',
  providers: [AuthService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lociproleAngular';
}
