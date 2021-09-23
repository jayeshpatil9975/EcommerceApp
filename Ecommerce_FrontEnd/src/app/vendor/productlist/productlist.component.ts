import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProductService } from 'src/app/shared/product.service';
import { AddproductComponent } from '../addproduct/addproduct.component';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  constructor(private productService:ProductService,private dialog:MatDialog) { }
  products;
  searchkey:string;
  displayedColumns:string[]=['productId','title','category','image','cost','availableQuantity','Actions'];
  AddproductComponent:any;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  loadList(){
    this.productService.GetProductRecords().subscribe(res=>{
      this.products=new MatTableDataSource(res);
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
    }
  
  
    onAdd(){
      const dialogconfig=new MatDialogConfig();
      dialogconfig.disableClose=true;
      dialogconfig.autoFocus=true;
      dialogconfig.width="800px";
      this.dialog.open(AddproductComponent,dialogconfig)
      .afterClosed().subscribe(res=>{this.loadList();
        this.productService.initializeForm();});
    }

    onDelete(productId,title){
      if (confirm("Do you want to change state of Product with Title: " + title)) {
        this.productService.DeleteProduct(productId).subscribe(res=>{alert("Product Deleted Successfully")},err=>{console.log(err)});
      }
    }
  
    onEdit(productId)
    {
      var products;var product;
      console.log(productId);
      this.productService.GetProductById(productId).subscribe(res=>{
        products=res;console.log(products);
        product={
          productId: products.productId, title: products.title, description: products.description, category: products.category,
          cost: products.cost, availableQuantity: products.availableQuantity,image: products.image,vendorID:products.vendorID
        };
        console.log(product);
        this.populateForm(product);
      

    },
        err=>{console.log(err);});
    }
  
    populateForm(product){
      this.productService.productForm.setValue(product);
      const dialogconfig=new MatDialogConfig();
      dialogconfig.disableClose=true;
      dialogconfig.autoFocus=true;
      dialogconfig.width="800px";
      this.dialog.open(AddproductComponent,dialogconfig)
      .afterClosed().subscribe(res=>{this.loadList();
        this.productService.initializeForm();});
    }

  
  clearSearch(){
    this.searchkey="";
  }
  
  applyFilter(){
      this.products.filter=this.searchkey.trim();
     // this.clearSearch();
  }

}
