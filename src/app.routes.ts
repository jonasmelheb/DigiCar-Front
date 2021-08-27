import { CreateCarrentalComponent } from './app/resources/car-rental/create-carrental/create-carrental.component';
import { CarRentalComponent } from './app/resources/car-rental/car-rental.component';
import { ViewCarrentalIdComponent } from './app/resources/car-rental/view-carrental-id/view-carrental-id.component';
import { Routes } from "@angular/router";
import { SigninComponent } from "./app/resources/signin/signin.component";
import { SignupComponent } from "./app/resources/signup/signup.component";
import { AuthGuard } from "./app/common/guard/auth.guard";
import { CarpoolingComponent } from "./app/resources/carpooling/carpooling.component";
import { CreateCarpoolingComponent } from "./app/resources/carpooling/create-carpooling/create-carpooling.component";
import { LoginGuard } from "./app/common/guard/login.guard";
import { MyReservedCarpoolingComponent } from "./app/resources/carpooling/my-reserved-carpooling/my-reserved-carpooling.component";
import { MyCreatedCarpoolingComponent } from "./app/resources/carpooling/my-created-carpooling/my-created-carpooling.component";
import { CarForCarRentalComponent } from "./app/resources/admin/car-for-car-rental/car-for-car-rental.component";
import { CreateCarForCarrentalComponent } from "./app/resources/admin/car-for-car-rental/create-car-for-carrental/create-car-for-carrental.component";
import {AdminGuard} from "./app/common/guard/admin.guard";

export const ROUTES: Routes = [
  { path: 'signin', component: SigninComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
  { path: 'carpooling', component: CarpoolingComponent, canActivate: [AuthGuard] },
  { path: 'carpooling/create', component: CreateCarpoolingComponent, canActivate: [AuthGuard] },
  { path: 'carpooling/create/:id', component: CreateCarpoolingComponent, canActivate: [AuthGuard] },
  { path: 'carpooling/reserved-carpooling', component: MyReservedCarpoolingComponent, canActivate: [AuthGuard] },
  { path: 'carpooling/my-carpooling', component: MyCreatedCarpoolingComponent, canActivate: [AuthGuard] },
  { path: 'car-rental', component: CarRentalComponent ,canActivate: [AuthGuard]},
  { path: 'car-rental/:id', component: ViewCarrentalIdComponent ,canActivate: [AuthGuard]},
  { path: 'car-rental/reserve/:id', component: CreateCarrentalComponent, canActivate: [AuthGuard] },
  { path: 'car-rental/reserve', component: CreateCarrentalComponent ,canActivate: [AuthGuard]},
  { path: 'car-for-carrental', component: CarForCarRentalComponent, canActivate: [AdminGuard] },
  { path: 'car-for-carrental/add', component: CreateCarForCarrentalComponent, canActivate: [AdminGuard] },
  { path: 'car-for-carrental/add/:id', component: CreateCarForCarrentalComponent, canActivate: [AdminGuard] },
  { path: '', pathMatch: 'full', redirectTo: '/signin' },
]
