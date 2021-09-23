import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customvalidation } from '../Validation/customvalidation';
import { Product } from './product';
import { Vendor } from './vendor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    
 
  url="https://localhost:44308/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':"Bearer "+localStorage.getItem("token")
    })
  }

  constructor(private http:HttpClient,private customValidation:Customvalidation) { }

  productForm:FormGroup=new FormGroup({
    productId:new FormControl(null),
    title:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    image:new FormControl(''),
    cost:new FormControl('',[Validators.required,Validators.min(0)]),
    description:new FormControl(''),
	  category:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
	  availableQuantity:new FormControl('',[Validators.required,Validators.min(0)]),
	  vendorID:new FormControl('')
  },{
    validators:([this.customValidation.ValidateProductTitle(this)]
      )
  });

  initializeForm(){
    this.productForm.setValue({
      productId:null,
      title:'',
      image:'',
      cost:'',
      description:'',
      category:'',
      availableQuantity:'',
      vendorID:''
    });}
    
    resetForms(){
      this.productForm.patchValue({
        productId:null,
        title:'',
        image:'',
        cost:'',
        description:'',
        category:'',
        availableQuantity:'',
        vendorID:''
      });
    }

    AllProductTitles() {
      return this.http.get(this.url+"products/AllProductTitles",this.httpOptions);
    }

  GetProductRecords():Observable<Product[]>
  {
    return this.http.get<Product[]>(this.url+"products",this.httpOptions);
  } 

  DeleteProduct(productId:number){
    return this.http.delete(this.url+"products"+productId,this.httpOptions);
  }

  AddProduct(product)
  {
    return this.http.post(this.url+"products", product, this.httpOptions);
  }

  EditProduct(productId,product)
  {
    return this.http.put(this.url+"products/"+productId,product,this.httpOptions);
  }

  GetProductById(productId:number)
  {
      return this.http.get(this.url+"/products/ProductById?productId="+productId,this.httpOptions);
  }

  AddProductToCart(cart)
  {
    return this.http.post(this.url+"carts",cart,this.httpOptions);
  }

  CartExists(cart:any)
  {
    return this.http.get(this.url+"carts/CartExisting?customerId="+cart.customerId+"&productId="+cart.productId,this.httpOptions);
  }

  EditCarts(cartexists:any)
  {
    
    var id=cartexists.cartId;
    cartexists.quantity=cartexists.quantity+1;
    return this.http.put(this.url+"carts/"+id,cartexists,this.httpOptions);
  }
}
