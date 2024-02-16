import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    "EmailId": "",
    "Password": ""
  }

  router = inject(Router);

  constructor(private userSrv: UserService ) {

  }

  login() {
    debugger;
    this.userSrv.onLogin(this.loginObj).subscribe((res:any)=> {
      debugger;
      if(res.result) {
        localStorage.setItem('angular17TokenData', JSON.stringify(res.data));
        localStorage.setItem('angular17TokenEmail', res.data.emailId);
        localStorage.setItem('angular17TokenUserId', res.data.userId);
        this.router.navigateByUrl('/dashboard');
      } else {
        alert(res.message)
      }
    },error=>{
      alert("Wrong Credentials")
    })
  }
}
