
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';
import { Doctors } from '../../interfaces/Doctors';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Appointment } from '../../interfaces/Appointment-request';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatNativeDateModule,MatDatepickerModule,MatIconModule, MatInputModule, MatSelectModule, RouterLink, ReactiveFormsModule,AsyncPipe,RouterModule,HttpClientModule,CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  //for edit purpose
  appointmentId!: number;
  appointment: Appointment = {} as Appointment; 

  //for date and time 
    minDate:Date;
    maxDate:Date;
    hours: number[] = [];
  minutes: number[] = [];

 //  selectedHour!: number;
  // selectedMinute!: number;
  //for time 
   @ViewChild('hourSelect') hourSelect!: MatSelect;
   @ViewChild('minuteSelect') minuteSelect!: MatSelect;

 // authServices=inject(AuthService)
  locations$!: Observable<Doctors[]>;
  AppointmentForm!: FormGroup;
  
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private matSnackbar: MatSnackBar,private route:ActivatedRoute) {
    
    this.AppointmentForm = this.fb.group({
      date: ["", [Validators.required]],
      doctors:  [""],

    });
    
    this.minDate = new Date();
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
       // Get the current hour and minute
   // const currentHour = currentDate.getHours();
   // const currentMinute = currentDate.getMinutes();

    //time  populating
    // Populate hours and minutes arrays
    for (let i =  0; i < 24; i++) {
      this.hours.push(i);
    }

    for (let i = 0; i <= 60; i ++) {
      this.minutes.push(i);
    }

   
  }
  
    
    ngOnInit(): void {
      
      this.appointmentId = +(this.route.snapshot.paramMap.get('id')?? 0);
      this.getappointmentsbyid(this.appointmentId)

      this.locations$ = this.authService.getDoctors();
      this.locations$.subscribe(data => console.log('Locations:', data));
    
    }
    
/*   getappointmentsbyid(id:number){
        this.authService.getappointmentsbyid(id).subscribe(appointment => {
          this.appointment = appointment;
          this.AppointmentForm.patchValue(
            {
              date:new Date(appointment.date),
              doctor:appointment.doctor,   
            }
          );
           // Set hour and minute after the view is initialized
        this.setHourAndMinute(appointment.time);
        })
    }  */
    getappointmentsbyid(id: number) {
      this.authService.getappointmentsbyid(id).subscribe(appointment => {
        this.appointment = appointment;
        console.log('Appointment:', appointment);
  
        // Ensure the doctor value matches one of the available options
        this.locations$.subscribe(locations => {
          const doctorExists = locations.some(location => location.doctors === appointment.doctor);
          if (doctorExists) {
            this.AppointmentForm.patchValue({
              date: new Date(appointment.date),
              doctors: appointment.doctor,
            });
          } 
          else {
            console.error('Doctor value does not match any available options');
          }

        });
         // Set hour and minute after the view is initialized
         this.setHourAndMinute(appointment.time);
      });
    }
    setHourAndMinute(time: string) {
      if (time) {
        const [hour, minute] = time.split(':').map(Number);
        this.hourSelect.value = hour;
        this.minuteSelect.value = minute;
      }
    }



    Login(selectedHour: number, selectedMinute: number) {
      const combinedTime = `${selectedHour}:${selectedMinute}`;
     const dateOnly = (new Date( this.AppointmentForm.value.date)).toISOString().split('T')[0];
   
      const appointment:Appointment=
      {       
        //date:this.AppointmentForm.value.date,
        id:this.appointmentId,
        date:dateOnly,
        time: combinedTime,
        doctor:this.AppointmentForm.value.doctors,
      //  fullname:this.authService.getUserDetail().fullName,
      //  mobilenumber:this.authService.getUserDetail().mobilenumber, //|| 'Default mobienumber',
      fullname:this.AppointmentForm.value.FullName,
      mobilenumber:this.AppointmentForm.value.mobienumber //|| 'Default mobienumber',
      } 
    
    
      this.authService.Updateappointment(appointment).subscribe({
        next: (response)=>{
          
          console.log("next hit");
          this.matSnackbar.open(response.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
       
         // this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);// The error property is a function that specifies what should happen if an error occurs during the Observable execution. It receives the error object and logs it to the console
         
        },
      })
     }

     
    /*   logout = () => {
        this.authService.logout();
        this.matSnackbar.open('Logout success', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.router.navigate(['/login']);
      }; */
     
}
