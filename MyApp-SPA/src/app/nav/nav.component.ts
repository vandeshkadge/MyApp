import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }
  // tslint:disable-next-line: typedef
  login(){
    this.authService.login(this.model).subscribe(next => {
      console.log('login sucessfully');
    },
    error => {
      console.log('Failed to login ');
    });

  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedOut()
  {
    localStorage.removeItem('token');
    console.log('Logged out sucessfully');
  }
}
