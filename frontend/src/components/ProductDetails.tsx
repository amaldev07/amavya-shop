import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useCart } from '../hooks/useCart';
import { Product } from '../types/product.types';
import './ProductDetails.scss';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useApi();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      getProductById(Number(id)).then((prod) => {
        setProduct(prod);
        if (prod?.images[0]) {
          setSelectedImage(`/assets/prod-images/${prod.images[0]}`);
        }
      });
    }
  }, [id, getProductById]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (!product) {
    return <div className="product-details"><p>Product not found.</p></div>;
  }

  return (
    <div className="product-details">
      {/* Left: Product Images */}
      <div className="product-gallery">
        <img src={selectedImage} alt="Main Product" className="main-image" />

        <div className="thumbnail-row">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={`/assets/prod-images/${img}`}
              alt="Product Thumbnail"
              onClick={() => setSelectedImage(`/assets/prod-images/${img}`)}
              className={selectedImage === `/assets/prod-images/${img}` ? 'active-thumb' : ''}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>

        <div className="quantity">
          <label htmlFor="qty">Quantity:</label>
          <input
            type="number"
            id="qty"
            name="qty"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />
        </div>

        <div className="action-buttons">
          <button className="btn add-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="btn buy-now">Buy Now</button>
        </div>

        <div className="description">
          <h3>Product Description</h3>
          <ul>
            <li>✅ Anti-Tarnish Jewellery</li>
            <li>💧 Water & Soap Resistant</li>
            <li>✨ Long-Lasting Shine</li>
            <li>🌸 Premium Quality Finish</li>
          </ul>
          <p className="note">
            Each Amavya piece is crafted to maintain its luster and beauty for
            years. Handle with care and store in a dry place when not in use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
