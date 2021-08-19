import { Routes } from "@angular/router";
import { HomeComponent } from "./app/resources/home/home.component";
import { SigninComponent } from "./app/resources/signin/signin.component";
import { SignupComponent } from "./app/resources/signup/signup.component";
import {AuthGuard} from "./app/common/guard/auth.guard";
import {CarpoolingComponent} from "./app/resources/carpooling/carpooling.component";
import {CreateCarpoolingComponent} from "./app/resources/carpooling/create-carpooling/create-carpooling.component";

export const ROUTES: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'carpooling', component: CarpoolingComponent ,canActivate: [AuthGuard]},
  { path: 'carpooling/create', component: CreateCarpoolingComponent ,canActivate: [AuthGuard]},
  { path: '', pathMatch: 'full', redirectTo: '/signin' },
]