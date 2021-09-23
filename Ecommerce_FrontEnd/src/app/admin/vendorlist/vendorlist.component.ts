import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { RegisterService } from 'src/app/shared/register.service';
import { VendorService } from 'src/app/shared/vendor.service';
import { AddvendorComponent } from '../addvendor/addvendor.component'

@Component({
  selector: 'app-vendorlist',
  templateUrl: './vendorlist.component.html',
  styleUrls: ['./vendorlist.component.css']
})
export class VendorlistComponent implements OnInit {

  constructor(public vendorservice:VendorService,public registerservice:RegisterService,private dialog:MatDialog) { }
  vendors;
  searchkey:string;
  displayedColumns:string[]=['vendorID','userName','email','gender','isActive','createdDate','profileImage','Actions'];
  AddvendorComponent:any;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  loadList(){
    this.vendorservice.GetVendorRecords().subscribe(res=>{
      this.vendors=new MatTableDataSource(res);
      console.log(this.vendors);
      if(this.sort){
        this.vendors.sort=this.sort;
      }
      if(this.paginator){
        this.vendors.paginator=this.paginator;
      }
    },err=>{console.log(err);})
  }
  
    ngOnInit() {
      this.loadList();
    }
  
  
    onAdd(){
      const dialogconfig=new MatDialogConfig();
      dialogconfig.disableClose=true;
      dialogconfig.autoFocus=true;
      dialogconfig.width="800px";
      this.dialog.open(AddvendorComponent,dialogconfig)
      .afterClosed().subscribe(res=>{this.loadList();
        this.registerservice.initializeForm();});
    }
  
    onEdit(vendorID)
    {
      var vendors;var vendor;
      console.log(vendorID);
      this.vendorservice.GetVendorById(vendorID).subscribe(res=>{
     vendors=res;console.log(vendors);
      vendor={userId:vendors.vendorID,userName:vendors.userName,email:vendors.email,password:vendors.password,confirmPassword:vendors.password,dateOfBirth:vendors.dateOfBirth,
        gender:vendors.gender,mobileNo:vendors.mobileNo,role:vendors.role,profileImage:vendors.profileImage,
        createdDate:vendors.createdDate,isActive:vendors.isActive};
        console.log(vendor);
        this.populateForm(vendor);
      

    },
        err=>{console.log(err);});
    }
  
    populateForm(vendor){
      this.registerservice.registrationForm.setValue(vendor);
      const dialogconfig=new MatDialogConfig();
      dialogconfig.disableClose=true;
      dialogconfig.autoFocus=true;
      dialogconfig.width="800px";
      this.dialog.open(AddvendorComponent,dialogconfig)
      .afterClosed().subscribe(res=>{this.loadList();
        this.registerservice.initializeForm();});
    }
  
    onDelete(vendorId,userName){
      if (confirm("Do you want to change state of Vendor with Name: " + userName)) {
        this.vendorservice.DeleteVendorRecord(vendorId).subscribe(res=>{alert("vendor state changed successfully");
      this.loadList();},
        err=>{console.log(err);});
      }
  
      
  }
  
  clearSearch(){
    this.searchkey="";
  }
  
  applyFilter(){
      this.vendors.filter=this.searchkey.trim().toLowerCase();
     // this.clearSearch();
  }

}
