import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private api: HttpClient ) {}

  ngOnInit(): void {
  }
  fcEmail = new FormControl();
  fcPassword = new FormControl();
  requestResult = '';
  title = 'portal';

  async login() {
    var result:any = await this.api.post(environment.API_URL+"/user/login", 
    {"email": this.fcEmail.value, 
    "password":this.fcPassword.value}).toPromise();
 
    if(result.success){
      this.nav('home');
    }
    else{alert('Your Email or Password is Incorrect');
    }
    console.log(result.success);
    this.requestResult = result.data;
    // if (this.fCEmail.value == 'adrianvasaya@yahoo.com' && this.fCPassword.value == '123456') {
    //  this.nav('home');
    // } else {
    //   alert('Your Email or Password is Incorrect');
    //   console.log('Hatdog Wrong');
    // }
  }

  nav(destination: string){
    this.router.navigate([destination]);
  }
}
