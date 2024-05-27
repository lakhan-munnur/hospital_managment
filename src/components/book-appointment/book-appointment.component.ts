
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';
import { Doctors } from '../../interfaces/Doctors';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Appointment } from '../../interfaces/Appointment-request';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatNativeDateModule,MatDatepickerModule,MatIconModule, MatInputModule, MatSelectModule, RouterLink, ReactiveFormsModule,AsyncPipe,RouterModule,HttpClientModule,CommonModule],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointnetComponent implements OnInit {

    minDate:Date;
    maxDate:Date;
    hours: number[] = [];
  minutes: number[] = [];
 //  selectedHour!: number;
  // selectedMinute!: number;
   //@ViewChild('hourSelect') hourSelect!: MatSelect;
 //  @ViewChild('minuteSelect') minuteSelect!: MatSelect;

 // authServices=inject(AuthService)
  locations$!: Observable<Doctors[]>;
  username:string="";
  AppointmentForm!: FormGroup;
  validuser:any;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private matSnackbar: MatSnackBar) {
    this.minDate = new Date();//today date
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());//today to one month
       // Get the current hour and minute
  /*   const currentHour = currentDate.getHours();
   // const currentMinute = currentDate.getMinutes();

    //time  populating
    // Populate hours and minutes arrays
    for (let i =  currentHour; i < 24; i++) {
      this.hours.push(i);
    }

    for (let i = 0; i <= 60; i ++) {
      this.minutes.push(i);
    } */


  }

    
    ngOnInit(): void {
      this.AppointmentForm = this.fb.group({
        date: ['', [Validators.required]],
        doctors:  [""],
        selectedHour:[""],
   
  
      });
     
      this.locations$ = this.authService.getDoctors();
      this.locations$.subscribe(data => console.log('Locations:', data));


     this.username= this.authService.getUsername().Username||"empty";  

       // Subscribe to date changes to adjust time options
  //  this.AppointmentForm.get('date')?.valueChanges.subscribe(date => this.updateTimeOptions(date));
  //  this.AppointmentForm.get('selectedHour')?.valueChanges.subscribe(hour => this.updateMinuteOptions(hour));
      // Subscribe to date and hour changes to adjust time options
      this.AppointmentForm.get('date')?.valueChanges.subscribe(date => this.updateTimeOptions(date, this.AppointmentForm.value.selectedHour));
      this.AppointmentForm.get('selectedHour')?.valueChanges.subscribe(hour => this.updateTimeOptions(this.AppointmentForm.value.date, hour));
    // Initialize time options
   // this.updateTimeOptions(this.AppointmentForm.value.date);
    }

    updateTimeOptions(selectedDate: Date, selectedHour: number | null): void {
      const currentDate = new Date();
      this.hours = [];
      this.minutes = [];
  
      if (selectedDate) {
        const date = new Date(selectedDate);
        if (date.toDateString() === currentDate.toDateString()) 
        {
              // If the selected date is today, populate time arrays from current time onwards
              const currentHour = currentDate.getHours();
              const currentMinute = currentDate.getMinutes();
      
              for (let i = currentHour; i < 24; i++) {
                this.hours.push(i);
              }
      
              if (selectedHour === currentHour) {
                for (let i = currentMinute; i < 60; i++) {
                  this.minutes.push(i);
                }
              } else {
                for (let i = 0; i < 60; i++) {
                  this.minutes.push(i);
                }
              }
        } 
        
        else
        {
                // Otherwise, populate full range of hours and minutes
                for (let i = 0; i < 24; i++) {
                  this.hours.push(i);
                }
        
                for (let i = 0; i < 60; i++) {
                  this.minutes.push(i);
                }
        }
      }
    }
   /*  updateTimeOptions(date: Date): void {
      const currentDate = new Date();
      this.hours = [];
      this.minutes = [];
  
      if (date) {
        const selectedDate = new Date(date);
        if (selectedDate.toDateString() === currentDate.toDateString()) {
          // If the selected date is today, populate time arrays from current time onwards
          const currentHour = currentDate.getHours();
          const currentMinute = currentDate.getMinutes();
  
          for (let i = currentHour; i < 24; i++) {
            this.hours.push(i);
          }
  
          if (this.AppointmentForm.value.selectedHour === currentHour) {
            for (let i = currentMinute; i <= 60; i++) {
              this.minutes.push(i);
            }
          } 
          else {
            for (let i = 1; i <= 60; i++) {
              this.minutes.push(i);
            }
          }
        } else {
          // Otherwise, populate full range of hours and minutes
          for (let i = 1; i <= 24; i++) {
            this.hours.push(i);
          }
  
          for (let i = 1; i <= 60; i++) {
            this.minutes.push(i);
          }
        }
      }
    }
   */
     Login(selectedHour: number, selectedMinute: number) {

      const dateValue = this.AppointmentForm.value.date;

      // Ensure the date value is in a format that can be reliably parsed
      const parsedDate = new Date(dateValue);
      
      // Check if the date is valid
   
        // Extract year, month, and day in local time
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const day = String(parsedDate.getDate()).padStart(2, '0');
        const dateOnly = `${year}-${month}-${day}`;
     
  
      
      const combinedTime = `${selectedHour}:${selectedMinute}`;
     // const dateOnly = (new Date(this.AppointmentForm.value.date)).toISOString().split('T')[0];
      
      this.authService.getuserbyusername(this.username).subscribe({
        next: (validuser) => {
          const appointment: Appointment = {       
            date: dateOnly,
            time: combinedTime,
            doctor: this.AppointmentForm.value.doctors,
            fullname: validuser.fullName,
            mobilenumber: validuser.mobileNumber
          };
    
          this.authService.Appointment(appointment).subscribe({
            next: (response) => {
              console.log("Appointment creation successful");
              this.matSnackbar.open(response.message, 'Close', {
                duration: 5000,
                horizontalPosition: 'center',
              });
              this.router.navigate(['/appointmentlist']);
            },
            error: (error) => {
              console.log("Error creating appointment");
              this.matSnackbar.open(error.error.message, 'Close', {
                duration: 5000,
                horizontalPosition: 'center',
              });
            }
          });
        },
        error: () => {
          console.log("Error fetching user details");
          this.matSnackbar.open("Failed to fetch user details", 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      });
    }
    

     
   
}
