import { Component, inject,OnInit  } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {  Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Appointment } from '../../interfaces/Appointment-request';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-Appointments-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink,CommonModule],

  templateUrl: './Appointments-list.component.html',
  styleUrl: './Appointments-list.component.css'
})
export class AppointmentListComponent implements OnInit  {

  constructor(private router:Router, private  matsnackbar :MatSnackBar)
  {

  }
 AppointmentList:Appointment[]=[];
 httpService=inject(AuthService);

 displayedColumns: string[] = [
  'id',
  'date',
  'time',
  'doctor',
  'action',
];

  ngOnInit(){
    this.getallappointmentshere()
 } 

 getallappointmentshere()
 {
  this.httpService.getallappointments().subscribe((result)=>{
    this.AppointmentList=result;
    console.log(result);
    console.dir(result);  // Shows interactive object structure
console.table(result); // Shows person data in a table
  });
 }

 edit(id:number){
  console.log(id);
  this.router.navigateByUrl("/edit/"+id) //navigate to other page which is like appointment page and that will pass object back to server edited
 }
 delete(id:number){
  this.httpService.deleteAppointment(id).subscribe({
    next: (response)=>{         
      console.log(response);
      console.log("this is responce");
      this.matsnackbar.open("deleted succesfully", 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
      });
  
    },
    error: (error) => {
      console.log(error);// The error property is a function that specifies what should happen if an error occurs during the Observable execution. It receives the error object and logs it to the console
      }
    })}
  }