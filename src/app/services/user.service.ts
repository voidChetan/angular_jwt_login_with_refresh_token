import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public $refreshToken = new Subject<boolean>;
  public $refreshTokenReceived = new Subject<boolean>;

  constructor(private http: HttpClient) {

    this.$refreshToken.subscribe((res:any)=> {
      this.getRefreshToken()
    })
   }

  onLogin(obj: any)   {
    return this.http.post("https://freeapi.gerasim.in/api/JWT/login", obj)
  }

  getRefreshToken()   {
    debugger;
    let loggedUserData : any;
    const localData =   localStorage.getItem('angular17TokenData');
    if(localData != null) {
      loggedUserData =  JSON.parse(localData);
    }
    const obj = {
      "emailId":  localStorage.getItem('angular17TokenEmail'),
      "token": "",
      "refreshToken": loggedUserData.refreshToken
    };
    this.http.post("https://freeapi.gerasim.in/api/JWT/refresh", obj).subscribe((Res:any)=>{
      localStorage.setItem('angular17TokenData', JSON.stringify(Res.data));
      this.$refreshTokenReceived.next(true);
    })
  }
 
  getUsers()   {
    return this.http.get("https://freeapi.gerasim.in/api/JWT/GetAllUsers")
  }
}
