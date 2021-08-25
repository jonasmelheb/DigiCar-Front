import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../common/services/login.service";
import {ERole} from "../../common/interfaces/ERole";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logIn = false;
  isAdmin!: boolean;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn()
  }

  isLoggedIn() {
    this.loginService.isLoggedIn().subscribe(
      isLogin => {
        this.logIn = isLogin;
        this.loginService.getUserAuth()?.subscribe(
          user => {
            user.roles.map(role => this.isAdmin = role.name === ERole.ROLE_ADMIN)
          })
      }
    )
  }

  logOut() {
    this.loginService.logout()
    if (this.logIn) {
      this.logIn = false;
    }
  }
}
