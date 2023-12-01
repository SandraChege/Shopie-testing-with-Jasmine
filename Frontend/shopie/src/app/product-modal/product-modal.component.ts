import { Component, Input } from '@angular/core';
import { getallproducts } from '../interface/products';
import { Router } from '@angular/router';
import { ProductsService } from '../service/Products/products.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent {
  viewSingleProduct: getallproducts[] = [];

  constructor(
    private router: Router,
    private productservice: ProductsService
  ) {}

  ngOnInit() {
    this.viewProduct();
  }

  viewProduct() {
    const productID = localStorage.getItem('selectedProductID');
    // console.log(productID);
    
    if(productID){
        this.productservice.getProductByID(productID)?.subscribe((response: getallproducts[]) => {
            console.log(response);
            //this.viewSingleProduct = response;
            // console.log(this.viewSingleProduct);
        });
    } else {
      console.log("Product ID not found");
      
    }
    
  }
}
