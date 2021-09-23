import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customvalidation } from '../Validation/customvalidation';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url="https://localhost:44308/api/";
AllEmails;
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

  constructor(private http:HttpClient,private customValidation:Customvalidation) { }

  registrationForm:FormGroup=new FormGroup({
    userId:new FormControl(null),
    userName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    password:new FormControl('',[Validators.required,Validators.pattern('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{4,8})$')]),
    confirmPassword:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    dateOfBirth:new FormControl('',Validators.required),
    gender:new FormControl('Male'),
    mobileNo:new FormControl('',[Validators.required,Validators.pattern('[0-9]{9}')]),
    role:new FormControl('Customer'),
    profileImage:new FormControl(),
    isActive:new FormControl(true),
    createdDate:new FormControl(new Date)
  },{
    validators:([this.customValidation.ValidatePassword
      ,this.customValidation.ValidateEmail(this)]
      )
  });

  initializeForm(){
    this.registrationForm.setValue({
    userId:null,
    userName:'',
    password:'',
    confirmPassword:'',
    email:'',
    dateOfBirth:'',
    gender:'Male',
    mobileNo:'',
    role:'Customer',
    profileImage:'',
    isActive:true,
    createdDate:new Date
    });}
    
    resetForms(){
      this.registrationForm.patchValue({
        userId:null,
        userName:'',
        password:'',
        confirmPassword:'',
        email:'',
        dateOfBirth:'',
        gender:'Male',
        mobileNo:'',
        role:'Customer',
        profileImage:'',
        isActive:true,
        createdDate:new Date
      });
    }
    


  GetAllEmails(){
    return this.http.get(this.url+"/login/AllEmails");
 }

 AddCustomerRecord(customer)
  {
    return this.http.post(this.url+"customers", customer, this.httpOptions);
  }

  AddVendorRecord(user)
  {
    return this.http.post(this.url+"vendors", user, this.httpOptions);
  }

  EditVendorRecord(userID,users)
  {
    return this.http.put(this.url+"vendors/"+userID,users,this.httpOptions);
  }
}
