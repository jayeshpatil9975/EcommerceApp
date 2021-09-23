import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url="https://localhost:44308/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':"Bearer "+localStorage.getItem("token")
    })
  }
  
  constructor(private http:HttpClient) { }

  GetCartRecords():Observable<Cart[]>
  {
    var id=JSON.parse(localStorage.getItem('currentUser')).customerID;
    return this.http.get<Cart[]>(this.url+"carts/CartByCustomerId?id="+id,this.httpOptions);
  }

  DeleteCartItem(cartId:number){
    return this.http.delete(this.url+"carts/"+cartId,this.httpOptions);
  }

  OrderCartItem(order)
  {
    return this.http.post(this.url+"orders",order,this.httpOptions);
  }

  ProductUpdate(id,quantity)
  {
    return this.http.put(this.url+"orders/ProductUpdate?id="+id+"&quantity="+quantity,this.httpOptions);
  }
}
