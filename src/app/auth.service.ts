import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccessTokenData, AuthToken, RegisteredUser, User, UserInfo} from "./models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'http://localhost:8001'

  constructor(private http: HttpClient) { }

  getAuthToken(username: string, password: string): Observable<UserInfo> {
    let data = {
      "username": username,
      "password": password,
    }
    return this.http.post<UserInfo>(`${this.BASE_URL}/auth/login/`, data);
  }

  logOut(refreshToken: string | null) {
    let data = {
      "refresh": refreshToken
    }
    return this.http.post(`${this.BASE_URL}/auth/logout/`, data);
  }

  register(username:string, password: string): Observable<RegisteredUser>{
    let data = {
      "username": username,
      "password": password,
    }
    return this.http.post<RegisteredUser>(`${this.BASE_URL}/auth/register/`,data);
  }

  refreshToken(token: string): Observable<AccessTokenData>{
    let data = {
      "refresh": token
    }
    return this.http.post<AccessTokenData>(`${this.BASE_URL}/auth/refresh/`, data)
  }
}
