export interface Product {
  id: string;
  name: string;
  priceWithTax: number;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalWithTax: number;
}