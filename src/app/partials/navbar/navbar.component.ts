import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../common/services/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logIn = false;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn()
  }

  isLoggedIn() {
    this.loginService.isLoggedIn().subscribe(
      isLogin => this.logIn = isLogin
    )
  }

  logOut() {
    this.loginService.logout()
    if (this.logIn) {
      this.logIn = false;
    }
  }
}
