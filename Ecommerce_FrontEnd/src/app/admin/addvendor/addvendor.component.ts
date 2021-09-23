import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { RegisterService } from 'src/app/shared/register.service';
import { VendorlistComponent } from '../vendorlist/vendorlist.component';

@Component({
  selector: 'app-addvendor',
  templateUrl: './addvendor.component.html',
  styleUrls: ['./addvendor.component.css']
})
export class AddvendorComponent implements OnInit {

  constructor(private registerService: RegisterService, private dialogRef: MatDialogRef<VendorlistComponent>) { }
  today = Date.now();
  maxDate = new Date(this.today);
  base64textString;
  ngOnInit() {

  }

  onFileChange(event) {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }



  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }


  onClose() {
    this.registerService.registrationForm.reset();
    this.registerService.initializeForm();
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.registerService.registrationForm.valid) {
      if (!this.registerService.registrationForm.get('userId').value) {
        var userRole = localStorage.getItem("userRole");
        var userForm = (this.registerService.registrationForm.value);
        var userMobNo = parseInt(this.registerService.registrationForm.get('mobileNo').value);
        if (userRole) {
          if (userRole == "Admin") {
            userForm.role = "Vendor";
          }

        }
        var user = {
          userName: userForm.userName, email: userForm.email, password: userForm.password, dateOfBirth: userForm.dateOfBirth,
          gender: userForm.gender, mobileNo: userForm.mobileNo, role: userForm.role, profileImage: this.base64textString,
          createdDate: userForm.createdDate, isActive: userForm.isActive
        };
        console.log(user);
        this.registerService.AddVendorRecord(user).subscribe(res => { console.log(res); alert("Vendor Added Successfully"); this.registerService.initializeForm(); this.dialogRef.close();}
          , err => { console.log(err); });

      }
      else {
        var userForm = (this.registerService.registrationForm.value);
        var userID = parseInt(this.registerService.registrationForm.get('userId').value);
        var userMobNo = parseInt(this.registerService.registrationForm.get('mobileNo').value);
        if (userRole) {
          if (userRole == "Admin") {
            userForm.role = "Vendor";
          }

        }
        var users = {
          vendorId: userID, userName: userForm.userName, email: userForm.email, password: userForm.password, dateOfBirth: userForm.dateOfBirth,
          gender: userForm.gender, mobileNo: userForm.mobileNo, role: userForm.role, profileImage: this.base64textString,
          createdDate: userForm.createdDate, isActive: userForm.isActive
        };
        this.registerService.EditVendorRecord(userID, users).subscribe(res => {
          console.log(res);
          this.dialogRef.close();
          alert("Vendor Updated Successfully");
        }, err => { console.log(err); });
      }
    }
  }

  onClear() {
    this.registerService.resetForms();
  }

}
