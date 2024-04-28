import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ɵɵinject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService =  ɵɵinject(AuthService);
  const router = ɵɵinject(Router)
  const toast= ɵɵinject(ToastrService)

  if (authService.isLoggedIn()) {
    return true;
  } else {
   // toast.error("Please Login First ",'ERROR');
    router.navigate(['login'])
    return false; 
  }
};