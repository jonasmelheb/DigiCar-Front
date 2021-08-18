import { Routes } from "@angular/router";
import { HomeComponent } from "./app/resources/home/home.component";
import { SigninComponent } from "./app/resources/signin/signin.component";
import { SignupComponent } from "./app/resources/signup/signup.component";
import {AuthGuard} from "./app/common/guard/auth.guard";

export const ROUTES: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: '', pathMatch: 'full', redirectTo: '/signin' },
]
