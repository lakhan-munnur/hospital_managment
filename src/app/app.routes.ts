import { Routes } from '@angular/router';
import { BookAppointnetComponent } from '../components/book-appointment/book-appointment.component';
import { RegisterComponent } from '../components/register/register.component';
import { AppointmentListComponent } from '../components/Appointments-list/Appointments-list.component';
import { EditComponent } from '../components/edit/edit.component';
import { Login1Component } from '../components/login1/login1.component';
import { HomeComponent } from '../components/home/home.component';
import { PatientMedicationComponent } from '../components/patient-medication/patient-medication.component';
import { PatientListComponent } from '../components/patient-list/patient-list.component';

export const routes: Routes = [

{path:'',component:HomeComponent},
{path:'bookapmnt',component:BookAppointnetComponent},
//{path:'navbar',component:NavbarComponent},
//{path: 'home',component:HomeComponent}
{path: 'register',component:RegisterComponent},///,
{path:'appointmentlist',component:AppointmentListComponent},
{path:'edit/:id',component:EditComponent},
{path:'login1',component:Login1Component},
{component:PatientMedicationComponent,path:'patmed/:Id'},
{component:PatientListComponent,path:'patients'}

];
