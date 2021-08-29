import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SigninRequest } from '../interfaces/signinRequest.model';
import { SigninResponse } from '../interfaces/signinResponse.model';
import { SignupRequest } from '../interfaces/signupRequest.model';
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "../interfaces/user.model";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginStatus = new BehaviorSubject<boolean>(LoginService.hasToken());

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }


  public signup(request: SignupRequest) {
    return this.httpClient.post<string>(environment.backendUrl + '/auth/signup', request)
      .pipe(
        catchError(LoginService.handleErrorSignUp)
      );
  }

  public signIn(request: SigninRequest) {
    return this.httpClient.post<SigninResponse>(environment.backendUrl + '/auth/signin', request)
      .pipe(
        tap((resp: SigninResponse) => {
          window.localStorage.setItem("auth", resp.accessToken)
          window.localStorage.setItem("auth-user", JSON.stringify(resp))
          this.loginStatus.next(true);
        }),
        catchError(LoginService.handleError)
      );
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Le pseudo ou le mot de passe sont incorrect.');
  }

  private static handleErrorSignUp(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Le pseudo ou l\'email existe déjà.');
  }

  public isLoggedIn() {
    return this.loginStatus.asObservable();
  }

  getToken(): string | null {
    const token = localStorage.getItem('auth');
    return LoginService.hasToken() ? token : null;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('auth-user')!);
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/signin'])
      .catch(error => {
        console.log('/connexion url no longer available. Check routing file.');
      });
  }

  private static hasToken(): boolean {
    return !!localStorage.getItem("auth");
  }

  getUserAuth() {
    if (LoginService.hasToken()) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
      return this.httpClient.get<User>(environment.backendUrl + '/user/user-auth', {
        headers
      })
    }
    return null;
  }
}
