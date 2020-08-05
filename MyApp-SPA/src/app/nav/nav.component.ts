import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  photoUrl: string;
  model: any = {};
  constructor(public authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.authService.currentPhotoUrl
      .subscribe(photoUrl => this.photoUrl = photoUrl);
    
  }
  // tslint:disable-next-line: typedef
  login(){
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('login sucessfully');
    },
    error => {
      this.alertify.error(error);
    }, () => { this.router.navigate(['/members']);
  });


  }

  // tslint:disable-next-line: typedef
  loggedIn(){
    return this.authService.loggedIn();
  }

  // tslint:disable-next-line: typedef
  loggedOut()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.success('Logged out sucessfully');
    this.router.navigate(['/home']);
  }
}
