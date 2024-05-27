import { Injectable } from '@angular/core';
import { RegisterRequest } from './interfaces/register-request';
import { AuthResponse } from './interfaces/auth-response';
import { Observable,map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Roles } from './interfaces/roles';

import { Ips } from './interfaces/ips';
import { Appointment } from './interfaces/Appointment-request';
import { Doctors } from './interfaces/Doctors';
import { Login } from './interfaces/login';
import { Medication } from './interfaces/medication';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Username='Username';
  private Password='Password';


  constructor(private http: HttpClient) { }

 // getRoles=():Observable<Roles[]> =>this.http.get<Roles[]>("https://localhost:7120/api/Account/roles")
 // getLocations():Observable<Locations[]> => this.http.get<Locations[]>("https://localhost:7120/api/Account/locations")
 // getIps():Observable<Ips[]> =>this.http.get<Ips[]>("https://localhost:7120/api/Account/ips")

  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>("https://localhost:7120/api/Account/roles");
  }


  getIps(): Observable<Ips[]> {
    return this.http.get<Ips[]>("https://localhost:7120/api/Account/ips");
  }

  login (data: Login): Observable<AuthResponse> 
  {
    
    //console.log(data);
    return this.http.post<AuthResponse>("https://localhost:7120/api/Account/login", data)
   .pipe( ///method is used to chain multiple operators together to create a sequence of operations on the data emitted by an Observable.
        //map is function takes each response from the HTTP request and processes it.
        map((response) => { //map operator takes each value emitted by the Observable
          //.map() is an operator that transforms each emitted value from the Observable stream using a function you provide.transforming the HTTP response received from a login request.
          if (response.isSuccess) // checks if the isSuccess property of the response is true
            {
              localStorage.setItem(this.Username,response.username);
              localStorage.setItem(this.Password,response.password);
            //second parameter is store din local storage 
            //setItem(key: string, value: string): void
          }
          return response; //This method returns an Observable representing the asynchronous login operation.
        })
      ); 

  }



  register (data: RegisterRequest): Observable<AuthResponse> 
  {
    return this.http.post<AuthResponse>("https://localhost:7120/api/Account/register", data)
  }

  addmedication (data:any ): Observable<AuthResponse> 
  {
    return this.http.post<AuthResponse>("https://localhost:7120/api/Account/medication", data)
  }
  logout = (): void => {
    localStorage.removeItem(this.Password);
    localStorage.removeItem(this.Username);
  };

  getuserbyusername(username:string){
     return this.http.get<RegisterRequest>("https://localhost:7120/api/Account/username/"+username);
    }


  getUsername = () => {
    const userDetail = {
      Username: localStorage.getItem(this.Username)
    };

    return userDetail;
  };



  getDoctors(): Observable<Doctors[]> {
    return this.http.get<Doctors[]>("https://localhost:7120/api/Account/doctors");
  }
  Appointment (data: Appointment): Observable<AuthResponse> 
  {
    console.log(data);
    return this.http.post<AuthResponse>("https://localhost:7120/api/Account/Appointment", data)
  }

  
  getallappointments(){
    // console.log("Api hitted,,..")
     return this.http.get<Appointment[]>("https://localhost:7120/api/Account/allappointments");
    }

    getpatientmedicationbyid(id:number){
      return this.http.get<Medication[]>("https://localhost:7120/api/Account/patientmedications/"+id)
    }


    getallpatients(){
      return this.http.get<RegisterRequest[]>("https://localhost:7120/api/Account/patients");
    }
    getappointmentsbyid(id:number){
      // console.log("Api hitted,,..")
       return this.http.get<Appointment>(" https://localhost:7120/api/Account/"+id);
      }

    deleteAppointment(appointmentid:number){
      // console.log("Api hitted,,..")
       return this.http.delete<Appointment>("https://localhost:7120/api/Account/"+appointmentid);
      }

      Updateappointment(updatedappointment:Appointment)
      {
       return this.http.put<AuthResponse>("https://localhost:7120/api/Account/Update",updatedappointment)
      }
     


      //This function retrieves the user details from the token stored in {{{local storage}}}.  //made this to show in home page nd navbar
  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
 
    const userDetail = {
  
      username: token
    
    };
    return userDetail;
  };
 //returns boolean


  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (token) return true;
    return false;
  };
 

  getToken = (): string | null =>localStorage.getItem(this.Username) || ''; 
}
