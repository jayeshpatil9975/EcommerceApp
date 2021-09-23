import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorlistComponent } from './admin/vendorlist/vendorlist.component';
import { MyordersComponent } from './customer/myorders/myorders.component';
import { ProductsComponent } from './customer/products/products.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LoginComponent } from './login/login.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { ProductlistComponent } from './vendor/productlist/productlist.component';
import { VendorordersComponent } from './vendor/vendororders/vendororders.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisteruserComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'vendors',component:VendorlistComponent},
  {path:'myproducts',component:ProductlistComponent},
  {path:'products',component:ProductsComponent},
  {path:'myorders',component:MyordersComponent},
  {path:'vendororders',component:VendorordersComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
