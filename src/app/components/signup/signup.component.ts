import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa fa-eye-slash";

  signupForm: FormGroup;

  constructor() {
    this.signupForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      fullname: new FormControl("", [Validators.required, Validators.minLength(4)]),
      password: new FormControl("", [Validators.required]),
  })
}


  hideShowPassword() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa fa-eye" : "fa fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onSubmit() {
    if(this.signupForm.valid){

    }else{
      ValidateForm.validateAllFormFields(this.signupForm)
    }
  }

}