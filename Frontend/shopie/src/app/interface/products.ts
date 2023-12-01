export interface getallproducts {
  category: string;
  description: string;
  image: string;
  isDeleted: boolean;
  price: number;
  productID: string;
  stock: number;
  title: string;
}
export interface addproduct {
  category: string;
  description: string;
  image: string;
  price: number;
  productID: string;
  stock: number;
  title: string;
}

export interface updateproduct {
  category: string;
  description: string;
  image: string;
  price: number;
  productID: string;
  stock: number;
  title: string;
}