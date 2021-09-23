import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { RegisterService } from './shared/register.service';
import { LoginService } from './shared/login.service';
import { Customvalidation } from './Validation/customvalidation';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordService } from './shared/forgetpassword.service';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { VendorlistComponent } from './admin/vendorlist/vendorlist.component';
import { AddvendorComponent } from './admin/addvendor/addvendor.component';
import { ProductlistComponent } from './vendor/productlist/productlist.component';
import { AddproductComponent } from './vendor/addproduct/addproduct.component';
import { ProductService } from './shared/product.service';
import { ProductsComponent } from './customer/products/products.component';
import { CartlistComponent } from './customer/cartlist/cartlist.component';
import { CartService } from './shared/cart.service';
import { MyordersComponent } from './customer/myorders/myorders.component';
import { VendorordersComponent } from './vendor/vendororders/vendororders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationbarComponent,
    RegisteruserComponent,
    LoginComponent,
    ForgetpasswordComponent,
    VendorlistComponent,
    AddvendorComponent,
    ProductlistComponent,
    AddproductComponent,
    ProductsComponent,
    CartlistComponent,
    MyordersComponent,
    VendorordersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RegisterService,LoginService,ForgetpasswordService,Customvalidation,ProductService,CartService],
  bootstrap: [AppComponent],
  entryComponents:[AddvendorComponent,AddproductComponent,CartlistComponent]
})
export class AppModule { }
