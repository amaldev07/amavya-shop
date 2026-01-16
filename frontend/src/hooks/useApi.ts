import { useState } from 'react';
import { Product } from '../types/product.types';

const dataUrl = '/assets/data/products.json';

export const useApi = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async (): Promise<Product[]> => {
    setLoading(true);
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      return data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(errorMsg);
      console.error('Error fetching products:', errorMsg);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: number): Promise<Product | undefined> => {
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product[] = await response.json();
      return data.find(p => p.id === id);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch product';
      setError(errorMsg);
      console.error('Error fetching product:', errorMsg);
      return undefined;
    }
  };

  return { products, loading, error, getProducts, getProductById };
};
