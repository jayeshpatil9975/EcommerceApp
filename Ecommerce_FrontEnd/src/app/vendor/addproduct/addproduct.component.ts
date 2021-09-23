import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProductService } from 'src/app/shared/product.service';
import { ProductlistComponent } from '../productlist/productlist.component';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  base64textString: string;

  constructor(private productService:ProductService,private dialogRef:MatDialogRef<ProductlistComponent>) { }

  ngOnInit() {
  }

  onFileChange(event)
  {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
}

_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
          console.log(btoa(binaryString));
  }

  onClose(){
    this.productService.productForm.reset();
    this.productService.initializeForm();
    this.dialogRef.close();
  }

  onClear(){
    this.productService.resetForms();
  }

  onSubmit() {
    if (this.productService.productForm.valid) {
      var vendor=JSON.parse(localStorage.getItem('currentUser'));
      if (!this.productService.productForm.get('productId').value) {
        var productForm = (this.productService.productForm.value);
        var price = parseInt(this.productService.productForm.get('cost').value);
        var availablquantity = parseInt(this.productService.productForm.get('availableQuantity').value);
        var product = {
           title: productForm.title, description: productForm.description, category: productForm.category,
          cost: price, availableQuantity: availablquantity,image: this.base64textString,vendorId:vendor.vendorID
        };
        this.productService.AddProduct(product).subscribe(res => { console.log(res); alert("Product Added Successfully");
         this.productService.initializeForm();this.dialogRef.close(); }
          , err => { console.log(err); });
      }
      else {
        
        var productForm = (this.productService.productForm.value);
        var productID = parseInt(this.productService.productForm.get('productId').value);
        console.log("productID"+productID);
        var price = parseInt(this.productService.productForm.get('cost').value);
        var availablquantity = parseInt(this.productService.productForm.get('availableQuantity').value);
        var products = {
          productId: productID, title: productForm.title, description: productForm.description, category: productForm.category,
          cost: price, availableQuantity: availablquantity,image: this.base64textString,vendorId:vendor.vendorID
        };
      
        this.productService.EditProduct(productID, products).subscribe(res => {
          console.log(res);
          this.dialogRef.close();
          alert("Product Updated Successfully");
        }, err => { console.log(err); }); 
      }
    }
  }
  
}
