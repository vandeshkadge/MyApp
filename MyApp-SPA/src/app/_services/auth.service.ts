import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
 jwthelper = new JwtHelperService();
 decodedToken: any;
constructor(private http: HttpClient) { }

// tslint:disable-next-line: typedef
login(model: any){

  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((Response: any) => {
      const user = Response;
      if (user)
      {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwthelper.decodeToken(user.token);
        console.log(this.decodedToken);
      }
    })
  );
 }

 // tslint:disable-next-line: typedef
 register(model: any)
 {
    return this.http.post(this.baseUrl + 'register', model);
 }

 // tslint:disable-next-line: typedef
 loggedIn()
 {
   const token = localStorage.getItem('token');
   return !this.jwthelper.isTokenExpired(token);
 }
}


