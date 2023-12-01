import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getallproducts } from '../interface/products';
import { ProductsService } from '../service/Products/products.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
})
export class UserhomeComponent {
  products: getallproducts[] = [];
  viewSingleProduct: getallproducts[] = [];
  searchtext = '';

  cartItems: any[] = [];

  constructor(
    private router: Router,
    private productservice: ProductsService
  ) {}
  ngOnInit() {
    this.fetchAllProducts();
  }
  //FETCH ALL PRODUCTS
  fetchAllProducts() {
    this.productservice.fetchAllProducts()?.subscribe((response: any) => {
      this.products = response;
      console.log(this.products);
    });
  }
  //SHOW PRODUCT
  showProduct = false;
  viewProduct(productID: string) {
    this.productservice
      .getProductByID(productID)
      ?.subscribe((response: getallproducts[]) => {
        this.viewSingleProduct = response;
        this.showProduct = true;
        console.log(this.viewSingleProduct);
      });
  }
  hideProduct() {
    this.showProduct = false;
  }

  //ADD TO CART
  addtoCart(product: getallproducts) {
    console.log(product);
    
    const cartString = localStorage.getItem('cart');
    const cartItems = cartString ? JSON.parse(cartString) : [];

    const existingItem = cartItems.find(
      (item: any) => item.productID === product.productID
    );

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
      }
    } else {
      const cartProduct = {
        productID: product.productID,
        image: product.image,
        title: product.title,
        price: product.price,
        quantity: 1,
      };

      cartItems.push(cartProduct);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
  
  }
}
