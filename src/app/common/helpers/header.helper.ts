import { Injectable } from '@angular/core';
import {LoginService} from "../services/login.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeaderHelper {

  constructor(
    private loginService: LoginService
  ) { }

  getHeaders() {
    if (this.loginService.isLoggedIn()) {
      return new HttpHeaders().set('Authorization', `Bearer ${this.loginService.getToken()}`)
    }
    return new HttpHeaders();
  }
}
