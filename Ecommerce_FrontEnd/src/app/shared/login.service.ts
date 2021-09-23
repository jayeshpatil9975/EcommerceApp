import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url="https://localhost:44308/api/";

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  LoginUser(loginUser):Observable<string> {
     return this.http.post<string>(this.url+"/Login",loginUser,this.httpOptions);
  }

  GetUserByEmail(user)
  {
    return this.http.get(this.url+"login/UserByEmail?="+user,this.httpOptions);
  }

  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  });

  initializeLoginForm(){
    this.loginForm.setValue({
      email:'',
      password:''
    })
  };
}
