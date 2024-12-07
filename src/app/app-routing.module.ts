import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompanyComponent} from "./company/company.component";
import {VacancyComponent} from "./vacancy/vacancy.component";
import {CompanyDetailsComponent} from "./company-details/company-details.component";
import { HomeComponent } from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {VacancyDetailsComponent} from "./vacancy-details/vacancy-details.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'companies', component: CompanyComponent},
  {path: 'companies/:id', component:CompanyDetailsComponent},
  {path: 'companies/:id/vacancies', component: VacancyComponent},
  {path: 'vacancy', component: VacancyComponent},
  {path: 'vacancies/:id', component:VacancyDetailsComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
