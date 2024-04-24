import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa fa-eye-slash";

  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      password: new FormControl("", [Validators.required]),
  })
}


  hideShowPassword() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa fa-eye" : "fa fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onSubmit() {
    if(this.loginForm.valid){

    }else{
      this.validateAllFormFields(this.loginForm)
    }
  }

  private validateAllFormFields(FormGroup:FormGroup){
    Object.keys(FormGroup.controls).forEach(field=>{
      const control = FormGroup.get(field);

      if(control instanceof FormControl){
        control.markAsDirty({ onlySelf:true })
      } 
      else{
        this.validateAllFormFields(FormGroup)
      }
    })
  }
}