import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Cart } from 'src/app/shared/cart';
import { ProductService } from 'src/app/shared/product.service';
import { CartlistComponent } from '../cartlist/cartlist.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cartexists=null;

  constructor(private productService:ProductService,private dialog:MatDialog) { }
  products;
  customerId;
  cart;
  gridColumns=4;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  loadList(){
    this.productService.GetProductRecords().subscribe(res=>{
      this.products=res;
      console.log(this.products);
      if(this.sort){
        this.products.sort=this.sort;
      }
      if(this.paginator){
        this.products.paginator=this.paginator;
      }
    },err=>{console.log(err);})
  }
  
  ngOnInit() {
    this.loadList();
    console.log(this.customerId);
  }

  addToCart(productId)
  {
    this.customerId=JSON.parse(localStorage.getItem('currentUser')).customerID;
    this.cart={productId:productId,quantity:1,customerId:this.customerId};
    console.log(this.cart);
    this.productService.CartExists(this.cart).subscribe(res=>{this.cartexists=res;
    
        this.productService.EditCarts(this.cartexists).subscribe(res=>{alert("Product Added To Cart");},err=>{console.log(err);});
      
    },err=>{this.productService.AddProductToCart(this.cart).subscribe(res=>{alert("Product Added To Cart");},err=>{console.log(err);});});
  }

  onViewCart()
  {
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="800px";
    this.dialog.open(CartlistComponent,dialogconfig)
    .afterClosed();
  }

}
