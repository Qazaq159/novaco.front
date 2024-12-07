import {Component, OnInit} from '@angular/core';
import {Company, Vacancy} from "../models";
import {ActivatedRoute} from "@angular/router";
import {CompanyService} from "../company.service";
import {VacancyService} from "../vacancy.service";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit {

  vacancy: Vacancy;
  isLogged = false;
  currentUser: string;
  constructor(private vacancyService: VacancyService, private route: ActivatedRoute) {
    this.vacancy = {} as Vacancy;
    this.currentUser = '';
  }

  ngOnInit(): void {
    this.getVacancy()
    let cookie_username = localStorage.getItem("username");
    if (cookie_username){
      this.isLogged = true;
      this.currentUser = cookie_username;
    }
  }

  getVacancy() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.vacancyService.getVacancy(id).subscribe((vacancy) => {
        this.vacancy = vacancy;
      })
    })
  }

  respond() {
    if (this.isLogged) {
      this.vacancyService.respond(this.vacancy.id).subscribe(
        (data => {
          window.alert("Succesfully responded");
        }),
        error => {
          window.alert(error['error']['non_field_errors'][0]);
        }
      )
    }
    else {
      alert("Please authorize first to respond");
    }
  }
}
