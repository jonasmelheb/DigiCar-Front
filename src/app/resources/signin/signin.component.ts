import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SigninRequest } from 'src/app/common/interfaces/signinRequest.model';
import { SigninResponse } from 'src/app/common/interfaces/signinResponse.model';
import { LoginService } from 'src/app/common/services/login.service';
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signIn!: FormGroup;
  message?: string;
  signinRequest!: SigninRequest;
  signinResponse!: SigninResponse;
  hide = true;

  get form() {
    return this.signIn;
  }

  get formControl() {
    return this.signIn.controls
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.signIn = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    console.log(this.cookieService.get('auth'))
  }

  onSubmit() {
    this.signinRequest = this.signIn.value;
    this.loginService.signIn(this.signinRequest).subscribe(
        response => {
          this.signinResponse = response;
          this.router.navigate(['/home'])
            .catch(error => {
              console.log('/connexion url no longer available. Check routing file.');
            });
        },
        error => {
          this.message = error
        }
    );
  }

}
