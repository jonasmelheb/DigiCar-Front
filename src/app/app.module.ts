import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { SignupComponent } from './resources/signup/signup.component';
import { SigninComponent } from './resources/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from 'src/app.routes';
import { CookieService } from 'ngx-cookie-service';
import { CarpoolingComponent } from './resources/carpooling/carpooling.component';
import { CreateCarpoolingComponent } from './resources/carpooling/create-carpooling/create-carpooling.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DetailCarpoolingComponent } from './resources/carpooling/detail-carpooling/detail-carpooling.component';
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";
import { NavbarComponent } from './partials/navbar/navbar.component';
import { CarForCarRentalComponent } from './resources/admin/car-for-car-rental/car-for-car-rental.component';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    CarpoolingComponent,
    CreateCarpoolingComponent,
    DetailCarpoolingComponent,
    NavbarComponent,
    CarForCarRentalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [CookieService, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}} ],
  bootstrap: [AppComponent]
})
export class AppModule { }