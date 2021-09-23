import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customvalidation } from '../Validation/customvalidation';
import { Vendor } from './vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  url="https://localhost:44308/api/vendors";
  constructor(private http:HttpClient,private customValidation:Customvalidation) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':"Bearer "+localStorage.getItem("token")
    })
  }

  GetVendorRecords():Observable<Vendor[]>
  {
    return this.http.get<Vendor[]>(this.url);
  }

  AddVendorRecord(vendor)
  {
    return this.http.post(this.url, vendor, this.httpOptions);
  }

  DeleteVendorRecord(vendorId:number){
      return this.http.put(this.url+"/ChangeVendorState?id=" + vendorId, this.httpOptions);
  }

  EditVendorRecord(vendorId,vendor)
  {
    return this.http.put(this.url+"/"+vendorId,vendor,this.httpOptions);
  }

  GetVendorCount()
  {
    return this.http.get(this.url+"/Count");
  }

  GetVendorById(vendorId:number)
  {
      return this.http.get(this.url+"/VendorById?vendorId="+vendorId);
  }

  GetVendorByName(vendorName:string)
  {
      return this.http.get(this.url+"/VendorByName?vendorName="+vendorName);
  }

}
