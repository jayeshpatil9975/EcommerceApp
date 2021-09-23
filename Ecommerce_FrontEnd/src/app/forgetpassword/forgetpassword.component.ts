import { Component, OnInit } from '@angular/core';
import { ForgetpasswordService } from '../shared/forgetpassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  forgetPasswordError:boolean=false;

  constructor(private forgetPasswordService:ForgetpasswordService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    var userForm=this.forgetPasswordService.forgetPasswordForm.value;
    var user={email:userForm.email,password:userForm.password}
    this.forgetPasswordService.ResetPassword(user)
    .subscribe(res=>{console.log(res);
    alert("Password Updated Successfully");
    this.router.navigate(['login']);
    this.forgetPasswordService.initializeForgetPasswordForm();
    },err=>{console.log(err);
    this.forgetPasswordError=err.error;
    })
    
  }

}
