import { Component } from '@angular/core';
import { Validators,FormArray,FormBuilder,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Medication } from '../../interfaces/medication';


@Component({
  selector: 'app-patient-medication',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './patient-medication.component.html',
  styleUrl: './patient-medication.component.css'
})
export class PatientMedicationComponent  implements OnInit {
  medicationForm: FormGroup;
  patientid!:number;

 
  constructor(private fb: FormBuilder ,private route:ActivatedRoute, private authservice:AuthService , private matSnackbar:MatSnackBar ) {
    this.medicationForm = this.fb.group({
      medications: this.fb.array([])   //form array
    });
  }
  ngOnInit(): void {
    this.patientid = +(this.route.snapshot.paramMap.get('Id')?? 0);
  }

 // send id and  remainig part with medication data


  addMedication()
  {
    this.medications.push(this.fb.group({
      MedicationName: ['', Validators.required],
      dosage: ['', Validators.required],
      frequency: ['', Validators.required],
      instructions: ''
    }));
  }
  get medications()
  {
    return this.medicationForm.get('medications') as FormArray;
  }
  removeMedication(index: number)
  {
    this.medications.removeAt(index);
  }


  submitMedication(index: number)
  {
    const medication = this.medications.at(index);
    console.log(medication.value); 
  }
  onSubmit() {
   // const patientId = +(this.route.snapshot.paramMap.get('Id') ?? 0); // Get patientId from route
    const medications = this.medicationForm.get('medications')?.value as Medication[]; // Cast to any[] for array access
  
    const medicationData = {
      patientId: this.patientid,
      medications: medications
    };
    console.log('Sending medication data:', medicationData);

    this.authservice.addmedication(medicationData).subscribe({
      next: (response)=>{         
        console.log("next hit");
        console.log("this is responce");
        this.matSnackbar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      // this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);// The error property is a function that specifies what should happen if an error occurs during the Observable execution. It receives the error object and logs it to the console
        this.matSnackbar.open(error.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },


    })
   
  }
  
}
