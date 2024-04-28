import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "https://localhost:7069/api/User/";
  private employeeUrl: string = "https://localhost:7069/api/Employee/";

  constructor(private http: HttpClient) { } 

  getEmployees() {
    return this.http.get<any>(this.employeeUrl);
  }
}
