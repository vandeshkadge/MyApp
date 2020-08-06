import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user: User;
registrationForm: FormGroup;
bsConfig: Partial<BsDatepickerConfig>;
@Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder, private router: Router){}

  // tslint:disable-next-line: typedef
  ngOnInit() {

    this.bsConfig = {
      containerClass: 'theme-red'
    },
    // this.registrationForm = new FormGroup(
    //   {
    //     username: new FormControl('', Validators.required),
    //     password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //     confirmPassword: new FormControl('', Validators.required)
    //   }, this.passwordMatchValidator
    // );

    this.createRegisterForm();
  }

  createRegisterForm()
  {
    this.registrationForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator});
  }

  // tslint:disable-next-line: typedef
  passwordMatchValidator(g: FormGroup)
  {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true} ;
  }

  // tslint:disable-next-line: typedef
  register()
  {

    if(this.registrationForm.valid)
    {
      this.user = Object.assign({}, this.registrationForm.value);
      this.authService.register(this.user).subscribe(() =>
      {
        this.alertify.success('registration successful');
      }, error =>
      {
        this.alertify.error('Failed to login');
      },
      () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
          });
      });
    }
  }

  // tslint:disable-next-line: typedef
  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
