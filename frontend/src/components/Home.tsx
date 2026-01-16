import React, { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { Product } from '../types/product.types';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Home: React.FC = () => {
  const { products, getProducts, loading, error } = useApi();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart(product, 1);
    navigate('/cart');
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>Adorn Your Aura</h2>
          <p>Premium Anti-Tarnish Jewellery, Crafted for Everyday Elegance.</p>
          <a href="#products" className="btn">Explore Collection</a>
        </div>
      </section>

      <section className="categories">
        <h3>Shop by Category</h3>
        <div className="category-list">
          <button className="category active">All</button>
          <button className="category">Necklaces</button>
          <button className="category">Earrings</button>
          <button className="category">Bracelets</button>
          <button className="category">Bangles</button>
        </div>
      </section>

      <section id="products" className="product-section">
        <div className="product-container">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                data-category={product.category}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={`/assets/prod-images/${product.thumbnail}`}
                  alt={product.name}
                />
                <h4>{product.name}</h4>
                <p className="price">₹{product.price}</p>

                <div className="card-actions">
                  <button
                    className="btn add-cart"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    Add to Cart
                  </button>
                  <button className="btn buy-now">Buy Now</button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
