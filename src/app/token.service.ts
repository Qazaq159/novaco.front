import { Injectable } from '@angular/core';

const ACCESSTOKEN_KEY = "access";
const REFRESHTOKEN_KEY = "refresh";
const USER_KEY = "username";
const ISSTAFF_KEY = "isStaff";
const ISLOGGED = "isLogged";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  logOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(ACCESSTOKEN_KEY);
    localStorage.setItem(ACCESSTOKEN_KEY, token);
  }

  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESHTOKEN_KEY);
    localStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public saveUsername(name: string): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, name);
  }

  public getToken(): string | null {
    return localStorage.getItem(ACCESSTOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESHTOKEN_KEY);
  }

  public getUsername(): string | null {
    return localStorage.getItem(USER_KEY);
  }


}
