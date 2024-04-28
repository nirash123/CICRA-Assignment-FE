import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public employees:any = [];

  public fullName : string = "";
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService) {}

  ngOnInit() {
    this.api.getEmployees()
    .subscribe(res => {
      this.employees = res;
    });

    this.userStore.getFullNameFromStore()
    .subscribe(val=> {
      let fullNameFormToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFormToken
    });
  }

  logout() {
    this.auth.signOut();
  }

}
