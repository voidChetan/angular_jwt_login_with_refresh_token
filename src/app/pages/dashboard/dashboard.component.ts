import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  userList: any []= [];
  constructor(private userSrv: UserService){
    this.getUsers();
    this.userSrv.$refreshTokenReceived.subscribe((res:any)=> {
      this.getUsers();
    })
  }

  getUsers() {
    this.userSrv.getUsers().subscribe((res:any)=>{
      this.userList =  res.data;
    })
  }
}
