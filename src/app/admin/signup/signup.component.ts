import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupRequestPayload } from './singup-request.payload';
import { AuthService } from '../../auth/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../admin/admin.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;
  isError: boolean;

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService) {
    this.signupRequestPayload = {
      username: '',
      email: ''
    };
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.isError = false;
      }, error => {
        console.log(error);
        this.isError = true;
        this.toastr.error('Registration Failed! Please try again');
      });
  }
}
