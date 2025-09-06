import React from 'react';
import { type Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
  onImageClick: (imageUrl: string, altText: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, onQuantityChange, onImageClick }) => {
  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(product.id, Math.max(0, newQuantity));
  };

  return (
    <div className="product-card">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="product-image" 
        onClick={() => onImageClick(product.imageUrl, product.name)}
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="price-info">
          <p className="price-with-tax">¥{product.priceWithTax.toLocaleString()}</p>
        </div>
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity === 0}
          >
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;