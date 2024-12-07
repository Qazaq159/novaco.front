import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vacancy, VacancyShort} from "./models";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  BASE_URL = 'http://localhost:8001'
  constructor(private client: HttpClient){}
  search(vacancy_name:string): Observable<VacancyShort[]>{
    return this.client.get<VacancyShort[]>(`${this.BASE_URL}/api/search?query=${vacancy_name}`);
  }

}
