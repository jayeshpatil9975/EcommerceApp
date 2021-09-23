import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  jwttoken;
  userEmail;
  currentUser;
  loginerror:boolean=false;
    constructor(private loginService:LoginService,private router:Router) { }
    
  
    ngOnInit() {}
  
    onLoginSubmit() {
        this.loginService.LoginUser(this.loginService.loginForm.value).subscribe(res=>{
          this.jwttoken=res;
          localStorage.setItem("token",this.jwttoken.token);
          this.userEmail=this.loginService.loginForm.get('email').value;
          this.loginService.loginForm.reset;
          
          this.loginService.GetUserByEmail(this.userEmail).
          subscribe(res=>{this.currentUser=res;console.log(this.currentUser);
          localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
          localStorage.setItem("userRole",this.currentUser.role);
          if(this.currentUser.role=='Admin'){this.router.navigate(['vendors']); }
          else if(this.currentUser.role=='Vendor'){
            this.router.navigate(['myproducts']);
          }
          else{
            this.router.navigate(['products']);
          }
          
          },
          err=>{console.log(err);})
        }  
          ,err=>{console.log(err);
          if(err.status=='401')
          {this.loginerror=true}
          })
    }

}
