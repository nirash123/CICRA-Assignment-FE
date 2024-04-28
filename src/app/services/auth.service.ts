import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7069/api/User/";

  constructor(private http: HttpClient, private router: Router) { } 

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

  signOut(){
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string){
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', tokenValue);
    }
  }

  getToken(){
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null; 
  }

  isLoggedIn(): boolean {
      if (typeof localStorage !== 'undefined') {
        return !!localStorage.getItem('token');
      }
      return false;
    
  }
}