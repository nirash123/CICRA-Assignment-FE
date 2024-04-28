import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { JwtHelperService } from '@auth0/angular-jwt'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7069/api/User/";

  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload = this.decodeToken();
  } 

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

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken() {
    if(this.userPayload)
      return this.userPayload.name
  }
}