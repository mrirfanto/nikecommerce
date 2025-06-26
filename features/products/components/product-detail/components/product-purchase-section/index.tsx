'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { Product } from '@/shared/types/product';

interface ProductPurchaseSectionProps {
  productId: string;
}

export default function ProductPurchaseSection({ productId }: ProductPurchaseSectionProps) {
  const [productData, setProductData] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDynamicData = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const product = await res.json();

        setProductData(product);
      } catch (error) {
        console.error('Failed to fetch dynamic product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicData();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      // TODO: Add to cart logic
      console.log(`Adding ${quantity} of product ${productId} to cart`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4" role="status">
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="text-red-600 p-4 border border-red-200 rounded">
        Unable to load pricing information. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">${productData.price}</span>
      </div>

      {/* Quantity Selector */}
      {productData.stock > 0 && (
        <div className="flex items-center gap-4">
          <span className="text-gray-900">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-gray-100 text-gray-900"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 min-w-[3rem] text-center text-gray-600">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(productData.stock, quantity + 1))}
              className="p-2 hover:bg-gray-100 text-gray-900"
              disabled={quantity >= productData.stock}
            >
              <Plus size={16} />
            </button>
          </div>
          {productData.stock > 0 ? (
            <>
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-600 ">In Stock ({productData.stock} available)</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-red-600 ">Out of Stock</span>
            </>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={productData.stock === 0}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          {productData.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
