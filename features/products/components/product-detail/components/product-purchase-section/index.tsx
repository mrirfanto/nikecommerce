'use client';

import { useState } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { Bounce, toast, ToastContainer } from 'react-toastify';

import { Product } from '@shared/types/product';
import { useCart } from '@shared/hooks/useCart';

interface ProductPurchaseSectionProps {
  product: Product;
}

export default function ProductPurchaseSection({ product }: ProductPurchaseSectionProps) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      addToCart(product, quantity);

      toast.success('Successfully add item into cart!', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });

      setQuantity(0);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (!product) {
    return (
      <div className="text-red-600 p-4 border border-red-200 rounded">
        Unable to load pricing information. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">${product.price}</span>
      </div>

      {/* Quantity Selector */}
      {product.stock > 0 && (
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
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="p-2 hover:bg-gray-100 text-gray-900"
              disabled={quantity >= product.stock}
            >
              <Plus size={16} />
            </button>
          </div>
          {product.stock > 0 ? (
            <>
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-600 ">In Stock ({product.stock} available)</span>
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
          disabled={product.stock === 0}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
