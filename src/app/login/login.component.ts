import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {User} from "../models";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLogged: Boolean;

  newUser: User;
  constructor(private authService:AuthService,
              private router: Router,
              private tokenService: TokenService) {
    this.newUser = {} as User;
    this.isLogged = localStorage.getItem('isLogged') === 'true';
  }

  login(){
    this.authService.getAuthToken(this.newUser.username, this.newUser.password).subscribe(data => {
      this.tokenService.saveUsername(data.username);
      this.tokenService.saveToken(data.tokens.access);
      this.tokenService.saveRefreshToken(data.tokens.refresh);
      if (data.is_staff) {
        localStorage.setItem("is_staff", String(data.is_staff));
      }
      localStorage.setItem("isLogged", String(true));
      this.router.navigate(['/']);
      },
      error => {
      window.alert(error['error']['non_field_errors'][0]);
      });
  }

}
