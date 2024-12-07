import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { VacancyComponent } from './vacancy/vacancy.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

import {CommonModule} from '@angular/common';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import {RouterOutlet} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthInterceptor} from "./AuthInterceptor";
import { VacancyDetailsComponent } from './vacancy-details/vacancy-details.component';
import { ProfileComponent } from './profile/profile.component';
import {CustomDatePipe} from "./custom.datepipe";
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    VacancyComponent,
    CompanyDetailsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    VacancyDetailsComponent,
    ProfileComponent,
    CustomDatePipe,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterOutlet,
    RouterOutlet,
    HttpClientModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
