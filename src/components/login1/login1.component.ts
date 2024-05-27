import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
//import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    RouterLink,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login1.component.html',
  styleUrl: './login1.component.css',
})
export class Login1Component implements OnInit {
  // instances of services 
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);
 

  login() {//When the login operation completes, the subscribe function is triggered.
    this.authService.login(this.form.value).subscribe({//The subscribe function is used to subscribe to the Observable returned by the login method of the authService
      next: (response)=>{
        console.log(response);//The error property is a function that specifies what should happen if an error occurs during the Observable execution. It receives the error object and logs it to the console
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log("error hit");// The error property is a function that specifies what should happen if an error occurs during the Observable execution. It receives the error object and logs it to the console
        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({//Instead of manually creating each form control and group, you can use methods like group() and control() provided by FormBuilder.
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
}