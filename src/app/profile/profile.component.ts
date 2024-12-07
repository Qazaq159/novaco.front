import {Component, OnInit} from '@angular/core';
import {Respond} from "../models";
import {RespondService} from "../respond.service";
import {TokenService} from "../token.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  myResponds: Respond[];
  username: string;

  constructor(private respondService: RespondService,
              private tokenService: TokenService,
              private authService: AuthService,
              private router: Router) {
    this.myResponds = [] as Respond[];
    this.username = '';
  }

  ngOnInit(): void {
    this.getResponds();
    let cookie_username = localStorage.getItem("username");
    if (cookie_username){
      this.username = cookie_username;
    }
  }
  getResponds(){
    this.respondService.getResponds().subscribe((responds =>{
      this.myResponds = responds;
    }))
  }

  logOut(){
    let token = this.tokenService.getRefreshToken();
    this.authService.logOut(token).subscribe(data => {
      localStorage.clear()
      this.router.navigate(['']).then();
    });
  }

}
