import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../service/Products/products.service';
import { getallproducts, } from '../interface/products';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css'],
})
export class AdminhomeComponent {
  searchtext = '';
  products: getallproducts[] = [];
  viewSingleProduct: getallproducts[] = [];

  product: any; //update product
  updatedProduct: any;
  productForm!: FormGroup;

  constructor(private router: Router, private productservice: ProductsService) {
    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.fetchAllProducts();
  }

  logOut() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }

  fetchAllProducts() {
    this.productservice.fetchAllProducts()?.subscribe((response: any) => {
      //console.log(response);
      this.products = response;
      // console.log(this.products);
    });
  }
  showProduct = false;

  viewProduct(productID: string) {
    this.productservice.getProductByID(productID)?.subscribe((response: getallproducts[]) => {
      this.viewSingleProduct = response;
      this.showProduct = true;
      console.log(this.viewSingleProduct);
      });
  }
  hideProduct() {
    this.showProduct = false;
  }

  //DELETE PRODUCT
  deleteProduct(productID: string) {
    this.productservice.deleteProduct(productID).subscribe(
      (response: any) => {
        console.log(response);
        this.fetchAllProducts();
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  showForm = false;

  updateProduct(productID: string) {
    const selectedProduct = this.products.find(
      (product) => product.productID === productID
    );
    // console.log(selectedProduct);
    if (selectedProduct) {
      const { isDeleted, ...rest } = selectedProduct;
      // console.log(rest);

      this.updatedProduct = rest;
      console.log(this.updatedProduct);
      this.showForm = true;
    }
  }
  hideForm() {
    this.showForm = false;
  }

  saveChanges() {
    if (this.productForm.valid) {
      // console.log(this.productForm.value);
      if (this.updatedProduct) {
        // console.log(this.updatedProduct);

        this.productservice.updateProduct(this.updatedProduct).subscribe(
          (response: any) => {
            // console.log(response);
            this.fetchAllProducts(); // Refresh the product list after updating
          },
          (error: Error) => {
            console.log(error);
          }
        );
        this.hideForm();
      }
    } else {
      console.log('Form is not valid. Cannot save changes.');
    }
  }
}
