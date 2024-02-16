import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserService } from './user.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const userSrv  = inject(UserService);

  let loggedUserData : any;
  const localData =   localStorage.getItem('angular17TokenData');
  if(localData != null) {
    loggedUserData =  JSON.parse(localData);
  }

  const cloneRequest =  req.clone({
    setHeaders:{
      Authorization: `Bearer ${loggedUserData.token}`
    }
  });

  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse)=>{
      debugger;
      if(error.status === 401) {
        const isRefrsh =  confirm("Your Session is Expred. Do you want to Continue");
        if(isRefrsh) {
          userSrv.$refreshToken.next(true);
        }

      } 
      return throwError(error)
    })
  );
};
