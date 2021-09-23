import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../shared/register.service';


@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {
  base64textString: string;

  constructor(private registerService:RegisterService,private router:Router) { }

  ngOnInit() {
  }

  onFileChange(event)
  {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
}



_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
          console.log(btoa(binaryString));
  }
  
  onSubmit()
    {
      if(this.registerService.registrationForm.valid)
      {
            var userRole=localStorage.getItem("userRole");
            var userForm=(this.registerService.registrationForm.value);
            var userMobNo=parseInt(this.registerService.registrationForm.get('mobileNo').value);
            if(userRole)
            {
              if(userRole=="Admin")
              {
                userForm.role="Vendor";
              }
              
            }
            var user={userName:userForm.userName,email:userForm.email,password:userForm.password,dateOfBirth:userForm.dateOfBirth,
              gender:userForm.gender,mobileNo:userForm.mobileNo,role:userForm.role,profileImage:this.base64textString,
              createdDate:userForm.createdDate,isActive:userForm.isActive};
              console.log(user);
              if(user.role=="Vendor")
              {   
                this.registerService.AddVendorRecord(user).subscribe(res=>
                  {console.log(res);alert("Vendor Added Successfully");this.intializeRegistrationForm();
                  this.router.navigate(['login']);}
                   ,err=>{console.log(err);});
              }
              else
              {
             this.registerService.AddCustomerRecord(user).subscribe(res=>
              {console.log(res);alert("Customer Added Successfully");this.intializeRegistrationForm();
              this.router.navigate(['login']);}
               ,err=>{console.log(err);});
             }
            
      }
    }


    intializeRegistrationForm()
    {
      this.registerService.registrationForm.setValue({
        userId:null,
        userName:'',
        password:'',
        confirmPassword:'',
        email:'',
        dateOfBirth:Date,
        gender:'Male',
        mobileNo:'',
        role:'Customer',
        profileImage:'',
        isActive:true,
        createdDate:new Date()
      });
    }
}
