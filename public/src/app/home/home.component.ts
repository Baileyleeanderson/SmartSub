import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  formReg: boolean;
  formLog: boolean;
  user:any;
  errors:any;
  login:any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    this.formReg = false;
    this.formLog = false;
    this.user = {email: "", username: "", password: "", pwconf: "", bio: ""};
    this.errors;
    this.login = {email: "", password: ""};
  }

  showForm(){
    this.formReg = true;
    this.formLog = false;
    this.login = {email: "", password: ""};
    this.errors = [];
  }
  showLogin(){
    this.formLog = true;
    this.formReg = false;
    this.user = {email: "", username: "", password: "", pwconf: ""};
    this.errors = [];
  }
  register(){
    console.log('register')
    this._httpService.register(this.user)
      .subscribe(data=>{
        console.log('reg made it', data)
        if(data['errors']){
          this.errors = data['errors']
          this.user = {email: "", username: "", password: "", pwconf: ""}; 
        }
        else{
          this._router.navigate(['/categories'])

        }
      });
  }
  loginUser(){
    this._httpService.login(this.login)
      .subscribe(data=>{
        console.log('login made it', data)
        if(data['errors']){
          this.errors = data['errors']
          this.login = {email: "", password: ""}; 
        }
        else{
          this._router.navigate(['/categories'])
        }  
      })
  }
}
