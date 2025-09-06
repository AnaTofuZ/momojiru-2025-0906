import React, { useState, useEffect } from 'react';
import { type Product } from '../types/Product';
import { loadProductsFromCSV } from '../utils/csvLoader';
import ProductCard from './ProductCard';

interface ProductListProps {
  onQuantityChange: (productId: string, quantity: number) => void;
  quantities: { [productId: string]: number };
  onImageClick: (imageUrl: string, altText: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onQuantityChange, quantities, onImageClick }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const loadedProducts = await loadProductsFromCSV('./products.csv');
        setProducts(loadedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">商品データを読み込み中...</div>;
  }

  if (error) {
    return <div className="error">エラー: {error}</div>;
  }

  return (
    <div className="product-list">
      <h2>宝灯桃汁サマーフェス グッズ一覧</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id] || 0}
            onQuantityChange={onQuantityChange}
            onImageClick={onImageClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;