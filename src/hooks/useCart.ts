import { useState, useCallback, useMemo } from 'react';
import type { Product, Cart, CartItem } from '../types/Product';

export const useCart = () => {
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
  const [products, setProducts] = useState<Product[]>([]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: quantity,
    }));
  }, []);

  const cart: Cart = useMemo(() => {
    const items: CartItem[] = [];
    let totalWithTax = 0;

    for (const product of products) {
      const quantity = quantities[product.id] || 0;
      if (quantity > 0) {
        items.push({ product, quantity });
        totalWithTax += product.priceWithTax * quantity;
      }
    }

    return {
      items,
      totalWithTax,
    };
  }, [products, quantities]);

  const clearCart = useCallback(() => {
    setQuantities({});
  }, []);

  return {
    quantities,
    cart,
    updateQuantity,
    clearCart,
    setProducts,
  };
};