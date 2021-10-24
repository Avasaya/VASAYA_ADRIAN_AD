import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  requestResult: any;

  constructor(private router: Router, private api: HttpClient) { }

  
  ngOnInit(): void {
  }
 
  async display() {
    var result:any =await this.api.get(environment.API_URL + "/user/all").toPromise();
    
    
       this.requestResult = result.data
  
    console.log(result.success);
 
}
}