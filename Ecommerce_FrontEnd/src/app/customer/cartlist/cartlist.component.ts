import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CartService } from 'src/app/shared/cart.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css']
})
export class CartlistComponent implements OnInit {
  carts;
  totalCost;
  searchkey:string;
  displayedColumns:string[]=['cartId','productName','quantity','totalCost','Actions'];
  constructor(private cartService:CartService,private dialogRef: MatDialogRef<ProductsComponent>) { }
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  loadList(){
    this.cartService.GetCartRecords().subscribe(res=>{
      this.carts=new MatTableDataSource(res);
      console.log(this.carts);
      if(this.sort){
        this.carts.sort=this.sort;
      }
      if(this.paginator){
        this.carts.paginator=this.paginator;
      }
    },err=>{console.log(err);})
  }

  onClose() {
    this.dialogRef.close();
  }
  
    ngOnInit() {
      this.loadList();
    }

    clearSearch(){
      this.searchkey="";
    }
    
    applyFilter(){
      console.log(this.searchkey);
        this.carts.filter=this.searchkey.trim().toLowerCase();
       // this.clearSearch();
    }

    onDelete(cartId,title){
      if (confirm("Do you want to remove product from cart with Name: " + title)) 
        this.cartService.DeleteCartItem(cartId).subscribe(res=>{alert("Item Removed From Cart successfully");
      this.loadList();},
        err=>{console.log(err);});
      }

      onOrder(cart){
        this.totalCost=cart.product.cost*cart.quantity;
        const order={customerId:cart.customerId,productId:cart.productId,quantity:cart.quantity,totalCost:this.totalCost};
        this.cartService.OrderCartItem(order).subscribe(res=>{alert("Item Ordered successfully");
        this.cartService.DeleteCartItem(cart.cartId).subscribe(res=>{console.log("Item Removed From Cart successfully");
        this.cartService.ProductUpdate(cart.product.productId,cart.quantity).subscribe(res=>{console.log("Quantity Updated");this.loadList();},
        err=>{console.log(err);});
        },
        err=>{console.log(err);});
        
        },
        err=>{console.log(err);});
      }

}
