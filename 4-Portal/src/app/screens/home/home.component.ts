import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  requestResult: any;
  payload: any;
  showId: boolean = true;
  showAll: boolean = true;
  showEdit: boolean = false;
  error: string = '';

  registerForm: FormGroup = new FormGroup({
    fcSearch: new FormControl('', Validators.required),
  });

  editForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl('', Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
    fcPassword: new FormControl('', Validators.required),
    fcPassword2: new FormControl('', Validators.required),
  });
  
  constructor(private router: Router, private api: HttpClient) { }


  ngOnInit(): void {
      this.display();
  }
 
  async display() {
    var result:any = await this.api.get(environment.API_URL + "/user/all").toPromise();
    this.showEdit = false;
    this.showAll = true;
    this.requestResult = result.data
    console.log(result.success);
}

async getIDAndTerm() {
  if (this.registerForm.value.fcSearch.length > 30){
    try {
      var result:any = await this.api.get(environment.API_URL + "/user/"+ this.registerForm.value.fcSearch).toPromise();
      if (result.success){
        this.showAll = false;
        this.showId = true;
        this.showEdit = false;
        this.requestResult.id = result.data.id
        this.requestResult.name = result.data.name
        this.requestResult.age = result.data.age
        this.requestResult.email = result.data.email
        console.log(this.registerForm.value.fcSearch.length);
        console.log(this.showId);
      }
      else{
        this.display();
        this.showAll = true;
        alert("ID not found in database");
        console.log(this.registerForm.value.fcSearch.length);
      }
    } catch (e) {
      console.log(e);
    }
  }

  else {
    try {
      var result:any = await this.api.get(environment.API_URL + "/user/search/"+this.registerForm.value.fcSearch).toPromise();
      if (result.success){
        this.requestResult = result.data
        console.log(result.success);
      }
      else{
        this.display();
        this.showAll = true;
        this.showEdit = false;
        alert("Seems like it is not in our database");
        console.log(this.registerForm.value.fcSearch.length);
      }
    } catch (e) {
      console.log(e);
      }
    }
  }  

  async deleteUser(){
    try{

      var result:any = await this.api.delete(environment.API_URL + "/user/"+this.registerForm.value.fcSearch,
      ).toPromise();
      
      this.requestResult = result.data
      alert ("Successfully Deleted ")
      this.display();
      console.log(result.success);
    }
    catch(e) {
      console.log(e);
    }
  }
  
  onSubmit() {
    if (
      this.editForm.value['fcPassword'] !==
      this.editForm.value['fcPassword2']
    ) {
      this.error = 'Password doesnt match!';
      return;
    }
    if (!this.editForm.valid) {
      {
        this.error = 'No fields must be empty';
        return;
      }
    }
    if (this.editForm.valid) {
      var payload: {
        name: string;
        email: string;
        age: number;
        password: string;
      };

      payload = {
        name: this.editForm.value.fcName,
        age: this.editForm.value.fcAge,
        email: this.editForm.value.fcEmail,
        password: this.editForm.value.fcPassword,
      };
      console.log(payload);
    }

  }

  async patchUser(){
    var result:any = await this.api.get(environment.API_URL + "/user/"+ this.registerForm.value.fcSearch).toPromise();
    if (result.success){
        this.requestResult.id = result.data.id
        this.requestResult.name = result.data.name
        this.requestResult.age = result.data.age
        this.requestResult.email = result.data.email
      this.showId = false;
      this.showAll = false;
      this.showEdit = true;
    }
    else {
      alert("User not found");
      this.display();
      this.showAll = true;
      this.showEdit = false;
    }
    
    this.clearForm();
  }

  async patchUserConfirm(){
    var result: any = await this.api
      .patch(environment.API_URL + "/user/"+this.registerForm.value.fcSearch, {
        name: this.editForm.value.fcName,
        age: this.editForm.value.fcAge,
        email: this.editForm.value.fcEmail,
        password: this.editForm.value.fcPassword,
      })
      .toPromise();
      console.log(result.success);
      if (result.success){
        this.display();
        this.display();
        this.showEdit = false;
      }
  }

  clearForm(){
    this.editForm.setValue({
    fcName: '',
    fcAge: '',
    fcEmail: '',
    fcPassword: '',
    fcPassword2: '',
    })
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }
}