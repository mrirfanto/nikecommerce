'use client';

import { Product } from '@/shared/types/product';
import { CartManager } from '@/shared/utils/cart-manager';
import { Cart } from '@shared/types/cart';
import { useCallback, useEffect, useState } from 'react';

interface UseCartReturn {
  cart: Cart;
  isLoading: boolean;
  addToCart: (product: Product, quantity: number) => Cart;
  updateQuantity: (productId: string, quantity: number) => Cart;
  removeFromCart: (productId: string) => Cart;
  clearCart: () => Cart;
}

export function useCart(): UseCartReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<Cart>(CartManager.getEmptyCart());

  useEffect(() => {
    setCart(CartManager.getCartItems());
    setIsLoading(false);
  }, []);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    const updatedCart = CartManager.addToCart({ product, quantity });
    setCart(updatedCart);

    return updatedCart;
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const updatedCart = CartManager.updateQuantity({ productId, quantity });
    setCart(updatedCart);
    return updatedCart;
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    const updatedCart = CartManager.removeFromCart(productId);
    setCart(updatedCart);
    return updatedCart;
  }, []);

  const clearCart = useCallback(() => {
    const updatedCart = CartManager.clearCart();
    setCart(updatedCart);
    return updatedCart;
  }, []);

  return {
    cart,
    isLoading,
    addToCart,
    clearCart,
    removeFromCart,
    updateQuantity,
  };
}
