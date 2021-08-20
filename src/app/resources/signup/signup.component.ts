import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupRequest } from 'src/app/common/interfaces/signupRequest.model';
import { LoginService } from 'src/app/common/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUp!: FormGroup;
  messageSuccess?: string;
  messageError?: string;
  signupRequest!: SignupRequest;
  hide = true;
  disable = false;

  get form() {
    return this.signUp;
  }

  get formControl() {
    return this.signUp.controls
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.signUp = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required,Validators.minLength(3)]],
    })
  }

  onSubmit() {
    this.signupRequest = this.signUp.value;
    this.loginService.signup(this.signupRequest).subscribe(
      message => {
        this.disable = true;
        this.messageSuccess = message;
        this.router.navigate(['/signin'])
          .catch(error => {
            console.log('/connexion url no longer available. Check routing file.');
          });
      },
      error => {
        this.messageError = error
      }
    );
  }

}
