import { Component, inject,OnInit,ViewChild  } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {  Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Appointment } from '../../interfaces/Appointment-request';
import { MatSnackBar } from '@angular/material/snack-bar';
//for popup
import { MatListModule } from '@angular/material/list';
import { TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Medication } from '../../interfaces/medication';
import { RegisterRequest } from '../../interfaces/register-request';
//import { BrowserModule } from '@angular/platform-browser';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-Appointments-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink,CommonModule,MatListModule,MatDialogModule,MatSortModule],

  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit  {

  constructor(private router:Router, private  matsnackbar :MatSnackBar,private dialog:MatDialog,private authservice:AuthService)
  {
    this.PatientList.filterPredicate = (data: RegisterRequest, filter: string) => {
      console.log(filter)
      return data.UserName.trim().toLowerCase().includes(filter);
      
    };
  }
  
  
 
  
//PatientList:RegisterRequest[]=[];
 httpService=inject(AuthService);
 medicationlist:Medication[]=[];

 PatientList: MatTableDataSource<RegisterRequest> = new MatTableDataSource();
 @ViewChild(MatSort) sort!: MatSort;
    // Customize filterPredicate to filter only by UserName
 

 displayedColumns: string[] = [
  'id',
  'userName',
  'FullName',
  'MobileNumber',
  'action',
];
data="Joshi"
  ngOnInit(){
    this.getallpatients()
 } 

 getallpatients(){
  this.httpService.getallpatients().subscribe((result)=>{
    this.PatientList.data=result;
    this.PatientList.sort=this.sort;
  });
 }




 openMedicationsPopup(templateRef: TemplateRef<any>,patientid:number): void {
  this.authservice.getpatientmedicationbyid(patientid).subscribe(
(result)=>{
  this.medicationlist=result
  console.log(this.medicationlist);
}
)
  this.dialog.open(templateRef, {
    width: '400', 
   
  });
}
givemedication(id:number){
  console.log(id);
  this.router.navigateByUrl("/patmed/"+id) //navigate to other page which is like appointment page and that will pass object back to server edited
}
 /* delete(id:number){
  this.httpService.deleteAppointment(id).subscribe({
    next: (response)=>{         
      console.log(response);
      console.log("this is responce");
      this.matsnackbar.open(response.message, 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
      });
  
    },
    error: (error) => {
      console.log(error);// The error property is a function that specifies what should happen if an error occurs during the Observable execution. It receives the error object and logs it to the console
      }
    })} */

   /*  applyFilter(event:any){

      const filterValue = (event.target as HTMLInputElement).value;
    this.PatientList.filter = filterValue.trim().toLowerCase();

    if (this.PatientList.paginator) {
      this.PatientList.paginator.firstPage();
    }

    } */
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.PatientList.filter = filterValue.trim().toLowerCase();
    }
  }