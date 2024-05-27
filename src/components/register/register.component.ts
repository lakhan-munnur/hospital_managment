
import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
//import { RolesService } from '../../app/services/roles.service';
import { Observable } from 'rxjs';
//import { Role } from '../../app/interfaces/role';
import { AsyncPipe } from '@angular/common';
//import { AuthService } from '../../app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { LocationService } from '../../app/services/location.service';
//import { Location } from '../../app/interfaces/location';
import { AuthService } from '../../auth.service';
import { Roles } from '../../interfaces/roles';
import { Doctors } from '../../interfaces/Doctors';
import { Ips } from '../../interfaces/ips';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatSelectModule, RouterLink, ReactiveFormsModule,AsyncPipe,RouterModule,HttpClientModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  
  authServices=inject(AuthService)

  roles$!:Observable<Roles[]>;
  locations$!: Observable<Doctors[]>;
  Ips$!:Observable<Ips[]>;
  
  
    registerForm!: FormGroup;
   // passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])\w{8,}$/;
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private matSnackbar: MatSnackBar
    ) {}
  
    
    ngOnInit(): void {
      this.registerForm = this.fb.group({
        UserName: ['', [Validators.required]],
        FullName: ["", [Validators.required]],
        MobileNumber: ['', Validators.required],
        password: ["",[Validators.required]],
      });
     // this.roles$=this.authService.getRoles();
     // this.locations$ = this.authService.getLocations();
     // this.Ips$! = this.authService.getIps();


     // this.roles$.subscribe(data => console.log('Roles:', data));
    //  this.locations$.subscribe(data => console.log('Locations:', data));
     // this.Ips$.subscribe(data => console.log('Ips:', data));
    }
  /*   handleLangs(event: any) {
      const locationsFormArray = this.registerForm.get('locations') as FormArray; // Get the locations FormArray
  
      if (event.target.checked) {
        locationsFormArray.push(this.fb.control(event.target.value)); // Push the value of the checked checkbox into the locations FormArray
      } else {
        const index = locationsFormArray.controls.findIndex(x => x.value === event.target.value);
        locationsFormArray.removeAt(index); // Remove the value from the locations FormArray if unchecked
      }
    } */
  
    register() {
     
     if (!this.registerForm.valid) {
      // Display a snackbar message indicating invalid form
      this.matSnackbar.open('Please fill in all required fields to register.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center'
      });
      return; // Prevent form submission
    }


      this.authService.register(this.registerForm.value).subscribe({
        next: (response)=>{         
          console.log("next hit");
          console.log("this is responce");
          this.matSnackbar.open(response.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
         this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log("error hit");// The error property is a function that specifies what should happen if an error occurs during the Observable execution. It receives the error object and logs it to the console
          this.matSnackbar.open(error.error.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        },
  
  
      })
     }
    /*  handleLangs (e:any){
      let langarr = this.registerForm.get('languages') as FormArray;
      if(e.target.checked) {
      langarr.push(new FormControl(e.target.value))
      }
      else
      {
        let i=0;
        langarr.controls.forEach(
        (location:any)=>
          {
        if(location.value==e.target.value) {
        langarr.removeAt(i)
        return
            }
            i++;
          })}} */
        
    
    

     
}