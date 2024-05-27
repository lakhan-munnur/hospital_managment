export interface Appointment {
    
    id?:string|number;
    date: string;
    time:string;
    doctor: string;
    fullname: string|null;
    mobilenumber: string|null;
}