import {  ValidatorFn, AbstractControl } from '@angular/forms';
import { ProductService } from '../shared/product.service';
import { RegisterService } from '../shared/register.service';


export class Customvalidation {
    url="https://localhost:44337/api/";
  
    constructor() { }
  
    ValidatePassword(control: AbstractControl) 
    {
        var checkCondition=control.get('password').value!==control.get('confirmPassword').value;
        return checkCondition? control['controls'].confirmPassword.setErrors({passwordNotMatch: true}):null;
    }
  
    // ValidateEmail(control:FormGroup)
    // {
    //     var AllEmails;
    //     var email=control.get('email').value;
    //     //this.http.get(this.url+"/users/GetAllEmails").subscribe(res=>{AllEmails=res;console.log(res);},err=>{console.log(err);});
    //     return AllEmails.indexOf(email)>-1?{notUniqueEmail:true}:null;
    // }

    ValidateEmail(registerService:RegisterService):ValidatorFn
    {   
        var AllEmails;
        registerService.GetAllEmails().subscribe(res=>{AllEmails=res;console.log(res);},err=>{console.log;});
        return (control:AbstractControl):{[key:string]:any}=>{
            var email=control.get('email').value;
            if(AllEmails===undefined)
            return null;
            return AllEmails.indexOf(email)>-1 ? control['controls'].email.setErrors({notUniqueEmail: true}) : null;
            
        }
    }


    ValidateProductTitle(productService:ProductService):ValidatorFn
    {   
        var AllProductTitles;
        productService.AllProductTitles().subscribe(res=>{AllProductTitles=res;console.log(res);},err=>{console.log;});
        return (control:AbstractControl):{[key:string]:any}=>{
            var title=control.get('title').value;
            if(AllProductTitles===undefined)
            return null;
            return AllProductTitles.indexOf(title)>-1 ? control['controls'].title.setErrors({notUniqueTitle: true}) : null;
            
        }
    }
    
  }