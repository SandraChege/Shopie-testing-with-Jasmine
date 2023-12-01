import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { addproduct, getallproducts, updateproduct } from 'src/app/interface/products';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  //CREATE PRODUCT
  async addNewProduct(productdetail: addproduct) {
    try {
      let response = await fetch('http://localhost:4500/product/add', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(productdetail),
      });

      const data = await response.json();

      console.log(data);

      return data;
    } catch (error) {
      console.log('In product service, you have the error', error);
    }
  }

  //FECTH ALL PRODUCTS
  fetchAllProducts() {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (token) {
      let response = this.http.get(
        'http://localhost:4500/product/getallproducts',
        {
          headers: new HttpHeaders({
            'Content-type': 'application/json',
            token: token,
          }),
        }
      );
      return response;
    } else {
      return null;
    }
  }

  //GET ONE PRODUCT BY ID/VIEW SINGLE PRODUCT
  getProductByID(productID: string) {
    const params = { productID };
    const url = `http://localhost:4500/product/getoneproduct/${productID}`;
    return this.http.get<getallproducts[]>(url, { params });
  }

  updateProduct(product: updateproduct) {
    //console.log(product);
    return this.http.put(
      'http://localhost:4500/product/updateproduct',
      product
    );
  }

  //DELETE PRODUCT
  deleteProduct(productID: string) {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (!token) {
      return throwError('User not authenticated');
    }

    const options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token: token,
      }),
    };

    return this.http.delete(
      `http://localhost:4500/product/deleteproduct/${productID}`,
      options
    );
  }
}
