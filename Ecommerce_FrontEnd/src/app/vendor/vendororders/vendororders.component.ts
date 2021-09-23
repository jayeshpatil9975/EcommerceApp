import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-vendororders',
  templateUrl: './vendororders.component.html',
  styleUrls: ['./vendororders.component.css']
})
export class VendorordersComponent implements OnInit {

  searchkey: string;

  constructor(private orderService:OrderService) { }
  orders;
  customerId;
  displayedColumns:string[]=['orderId','productName','quantity','totalCost','customerName'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngOnInit() {
    this.loadList();
  }

  loadList(){
    this.orderService.GetOrderByVendorId().subscribe(res=>{
      this.orders=new MatTableDataSource(res);
      console.log(this.orders);
      if(this.sort){
        this.orders.sort=this.sort;
      }
      if(this.paginator){
        this.orders.paginator=this.paginator;
      }
    },err=>{console.log(err);})
  }

  clearSearch(){
    this.searchkey="";
  }
  
  applyFilter(){
    console.log(this.searchkey);
      this.orders.filter=this.searchkey.trim();
     // this.clearSearch();
  }

}
