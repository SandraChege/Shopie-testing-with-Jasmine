import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../service/Products/products.service';
import { getallproducts } from '../interface/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any[] = [];


  constructor(
    private router: Router,
    private productservice: ProductsService
  ) {}
  ngOnInit() {
    this.displayCart();
  }

  displayCart() {
    const cartString = localStorage.getItem('cart');
    this.cartItems = cartString ? JSON.parse(cartString) : [];
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }
    clearCart() {
      localStorage.removeItem('cart')
      this.displayCart()
  }
}
