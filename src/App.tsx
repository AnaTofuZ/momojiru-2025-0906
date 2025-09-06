import { useState, useEffect } from 'react';
import { useCart } from './hooks/useCart';
import { loadProductsFromCSV } from './utils/csvLoader';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';
import OrderSummary from './components/OrderSummary';
import ImageModal from './components/ImageModal';
import './App.css';

function App() {
  const { quantities, cart, updateQuantity, clearCart, setProducts } = useCart();
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [imageModal, setImageModal] = useState<{
    isVisible: boolean;
    imageUrl: string;
    altText: string;
  }>({
    isVisible: false,
    imageUrl: '',
    altText: ''
  });

  const handleImageClick = (imageUrl: string, altText: string) => {
    setImageModal({
      isVisible: true,
      imageUrl,
      altText
    });
  };

  const handleImageModalClose = () => {
    setImageModal({
      isVisible: false,
      imageUrl: '',
      altText: ''
    });
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log('Loading products from CSV...');
        const products = await loadProductsFromCSV('./products.csv');
        console.log('Loaded products:', products);
        setProducts(products);
      } catch (error) {
        console.error('Failed to load products:', error);
        // エラー時でもアプリが表示されるよう、空の配列をセット
        setProducts([]);
      }
    };

    loadProducts();
  }, [setProducts]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>宝灯桃汁サマーフェス</h1>
        <p>グッズ販売</p>
      </header>
      
      <main className="app-main">
        <ProductList 
          quantities={quantities} 
          onQuantityChange={updateQuantity}
          onImageClick={handleImageClick}
        />
      </main>

      <CartSummary 
        cart={cart} 
        onShowSummary={() => setShowOrderSummary(true)} 
      />

      <OrderSummary 
        cart={cart} 
        isVisible={showOrderSummary} 
        onClose={() => setShowOrderSummary(false)}
        onClearCart={clearCart}
      />

      <ImageModal
        imageUrl={imageModal.imageUrl}
        altText={imageModal.altText}
        isVisible={imageModal.isVisible}
        onClose={handleImageModalClose}
      />
    </div>
  );
}

export default App;
