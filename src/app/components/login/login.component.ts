import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';

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

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toast: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', Validators.required]
  })
}


  hideShowPassword() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa fa-eye" : "fa fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onLogin() {
    if(this.loginForm.valid){

      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res=> {
          this.toast.success(res.message,'SUCCESS');
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        }),
        error:(err=>{
          this.toast.error(err.error.message,'ERROR');
          console.log(err)
        })
      })

    }else{
      ValidateForm.validateAllFormFields(this.loginForm)
    }
  }
}