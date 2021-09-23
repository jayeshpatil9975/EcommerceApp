import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from './cart';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  
  url="https://localhost:44308/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':"Bearer "+localStorage.getItem("token")
    })
  }
  
  constructor(private http:HttpClient) { }

  GetOrderRecords(customerId):Observable<Order[]> {
    return this.http.get<Order[]>(this.url+"orders/"+customerId,this.httpOptions);
  }

  GetOrderByVendorId():Observable<Order[]> {
    var vendorId=JSON.parse(localStorage.getItem('currentUser')).vendorID;
    return this.http.get<Order[]>(this.url+"orders/orderbyvendorid?id="+vendorId,this.httpOptions);
  }

}
