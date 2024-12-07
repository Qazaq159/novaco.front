import { Component } from '@angular/core';
import {User} from "../models";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  newUser: User;
  password2:string;
  constructor(private authService:AuthService,
              private route : ActivatedRoute,
              private router: Router) {
    this.newUser = {} as User;
    this.password2 = '';
  }

  register(){
      if (this.password2 == this.newUser.password){
        this.authService.register(this.newUser.username,this.newUser.password).subscribe(data => {
          if (data.id){
            alert("You have registered successfully! Please authorize")
            this.router.navigate(['/login']).then();
          }
        });
      }
  }
}
