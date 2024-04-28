import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public users:any = [];
  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    this.api.getUsers()
    .subscribe(res => {
      this.users = res;
    })
  }

  logout() {
    this.auth.signOut();
  }

}
