import { Pipe, PipeTransform } from '@angular/core';
import { getallproducts } from '../interface/products';

@Pipe({
  name: 'searchproduct',
})
export class SearchproductPipe implements PipeTransform {
  transform(allProducts: getallproducts[], searchtext: string): getallproducts[] {
    if (!allProducts || searchtext == '') {
      return allProducts;
    }
    const filtered: getallproducts[] = [];
    for (let product of allProducts) {
      if (
        (product.title.toLowerCase().includes(searchtext.toLowerCase())) ||
        (product.category.toLowerCase().includes(searchtext.toLowerCase()))
      ) {
        filtered.push(product);
      }
    }
    return filtered;
  }
}
