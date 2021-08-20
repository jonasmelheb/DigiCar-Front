import { Routes } from "@angular/router";
import { SigninComponent } from "./app/resources/signin/signin.component";
import { SignupComponent } from "./app/resources/signup/signup.component";
import {AuthGuard} from "./app/common/guard/auth.guard";
import {CarpoolingComponent} from "./app/resources/carpooling/carpooling.component";
import {CreateCarpoolingComponent} from "./app/resources/carpooling/create-carpooling/create-carpooling.component";
import {LoginGuard} from "./app/common/guard/login.guard";
import { CarForCarRentalComponent } from "./app/resources/admin/car-for-car-rental/car-for-car-rental.component";

export const ROUTES: Routes = [
  { path: 'signin', component: SigninComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
  { path: 'carpooling', component: CarpoolingComponent ,canActivate: [AuthGuard]},
  { path: 'carpooling/create', component: CreateCarpoolingComponent ,canActivate: [AuthGuard]},
  { path: '', pathMatch: 'full', redirectTo: '/signin' },
  { path: 'car-for-carrental', component: CarForCarRentalComponent ,canActivate: [AuthGuard]},
]
