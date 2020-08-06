import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
 jwthelper = new JwtHelperService();
 decodedToken: any;
 currentUser: User;
 photoUrl = new BehaviorSubject<string>('../../assets/user.png');
 currentPhotoUrl = this.photoUrl.asObservable();
constructor(private http: HttpClient) { }

// tslint:disable-next-line: typedef
changeMemberPhoto(photoUrl: string){
this.photoUrl.next(photoUrl);
}
// tslint:disable-next-line: typedef
login(model: any){

  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((Response: any) => {
      const user = Response;
      if (user)
      {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodedToken = this.jwthelper.decodeToken(user.token);
        this.currentUser = user.user;
        this.changeMemberPhoto(this.currentUser.photoUrl);
      }
    })
  );
 }

 // tslint:disable-next-line: typedef
 register(user: User)
 {
    return this.http.post(this.baseUrl + 'register', user);
 }

 // tslint:disable-next-line: typedef
 loggedIn()
 {
   const token = localStorage.getItem('token');
   return !this.jwthelper.isTokenExpired(token);
 }
}


