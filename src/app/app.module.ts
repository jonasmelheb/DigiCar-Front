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
import { HomeComponent } from './resources/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { CarpoolingComponent } from './resources/carpooling/carpooling.component';
import { CreateCarpoolingComponent } from './resources/carpooling/create-carpooling/create-carpooling.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    CarpoolingComponent,
    CreateCarpoolingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
