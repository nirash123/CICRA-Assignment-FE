import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 

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

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      fullname: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
      token: [""],
      role: [""],
  })
}


  hideShowPassword() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa fa-eye" : "fa fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onSignUp() {
    if (this.signupForm.valid) {
      this.auth.signUp(this.signupForm.value)
        .subscribe({
          next: (res => {
            alert(res.message);
            this.signupForm.reset();
            this.router.navigate(['login']);
        }),
          error: (err => {
            alert(err?.error.message); 
        })
        });
    } else {
      ValidateForm.validateAllFormFields(this.signupForm);
    }
  }

}