import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customvalidation } from '../Validation/customvalidation';
import { MatGridTileHeaderCssMatStyler } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {
  url="https://localhost:44308/api/";

  constructor(private http:HttpClient,private customValidation:Customvalidation) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  ResetPassword(user){
    return this.http.put(this.url+"login/ResetPassword",user,this.httpOptions);
  }

  forgetPasswordForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{4,8})$')]),
    confirmPassword:new FormControl('')
  },{
     validators:this.customValidation.ValidatePassword,
  });

  initializeForgetPasswordForm(){
    this.forgetPasswordForm.setValue({
      email:'',
      password:'',
      confirmpassword:''
    })
  };

}
