import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../service/Products/products.service';
import { addproduct } from '../interface/products';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent {
  addProductForm!: FormGroup;

  constructor(private productservice: ProductsService) {
    this.addProductForm = new FormGroup({
      image: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  addNewProduct() {
    if (this.addProductForm.valid) {
       //console.log(this.addProductForm.value);

       this.productservice.addNewProduct(this.addProductForm.value).then(
         (data: addproduct) => {
           console.log('Tour added successfully:', data);
           this.addProductForm.reset();
         },
         (err: Error) => {
           console.log(err);
         }
       );
     }
  }
}
