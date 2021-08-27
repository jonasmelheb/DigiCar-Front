import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../services/login.service";
import {ERole} from "../interfaces/ERole";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  isAdmin!: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.loginService.getUserAuth()?.subscribe(
      user => {
        user.roles.map(role => this.isAdmin = role.name === ERole.ROLE_ADMIN)
      }
    )
    if (this.isAdmin) {
      return true
    }

    this.router.navigate(['/carpooling']);
    return false;

  }

}
