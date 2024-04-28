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

  public users:any = [];

  public fullName : string = "";
  public role : string = "";
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService) {}

  ngOnInit() {
    this.api.getUsers()
    .subscribe(res => {
      this.users = res;
    });

    this.userStore.getFullNameFromStore()
    .subscribe(val=> {
      let fullNameFormToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFormToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=> {
      let roleFormToken = this.auth.getRoleFromToken();
      this.role = val || roleFormToken
    })
  }

  logout() {
    this.auth.signOut();
  }

}
