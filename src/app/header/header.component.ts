import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {TokenService} from "../token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  isLogged: boolean

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) {
    this.username = ''
    this.isLogged = false;
  }

  ngOnInit() {
    let cookie_username = localStorage.getItem("username");
    if(cookie_username) {
      this.isLogged = true;
      this.username = cookie_username;
    }
  }

  logOut(){
    let token = this.tokenService.getRefreshToken();
    this.authService.logOut(token).subscribe(data => {
      localStorage.clear();
      window.location.reload();
      this.router.navigate(['/']);
    });
  }
}
