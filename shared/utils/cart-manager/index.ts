import { Product } from '@shared/types/product';
import { Cart } from '@shared/types/cart';

const CART_STORAGE_KEY = 'ecommerce-cart';

export class CartManager {
  static getCartItems(): Cart {
    try {
      if (typeof window === 'undefined') {
        return CartManager.getEmptyCart();
      }

      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) {
        return CartManager.getEmptyCart();
      }

      const cart = JSON.parse(stored) as Cart;
      return cart;
    } catch (error) {
      console.error('Error loading cart from localStorage ', error);

      return CartManager.getEmptyCart();
    }
  }

  static setCartItems(cart: Cart): void {
    try {
      if (typeof window === 'undefined') return;

      const updatedCart: Cart = {
        ...cart,
        updatedAt: new Date().toLocaleDateString(),
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error saving cart to localStorage ', error);
    }
  }

  static addToCart({ product, quantity = 1 }: { product: Product; quantity: number }): Cart {
    const cart = CartManager.getCartItems();
    const existingCartItem = cart.items.find((cartItem) => cartItem.id === product.id);

    if (existingCartItem) {
      existingCartItem['quantity'] += quantity;
    } else {
      cart.items.push({
        ...product,
        quantity,
      });
    }

    const updatedCart = CartManager.validateAndCalculateCart(cart);
    CartManager.setCartItems(updatedCart);

    return cart;
  }

  static updateQuantity({ productId, quantity }: { productId: string; quantity: number }): Cart {
    const cart = CartManager.getCartItems();
    const existingCartItemIndex = cart.items.findIndex((cartItem) => cartItem.id === productId);

    if (existingCartItemIndex > 0) {
      if (quantity <= 0) {
        cart.items.splice(existingCartItemIndex, 1);
      } else {
        cart.items[existingCartItemIndex].quantity = quantity;
      }
    }

    const updatedCart = CartManager.validateAndCalculateCart(cart);
    CartManager.setCartItems(updatedCart);

    return cart;
  }

  static removeFromCart(productId: string): Cart {
    const cart = CartManager.getCartItems();

    cart.items = cart.items.filter((cartItem) => cartItem.id !== productId);

    const updatedCart = CartManager.validateAndCalculateCart(cart);
    CartManager.setCartItems(updatedCart);

    return cart;
  }

  static clearCart(): Cart {
    const cart = CartManager.getEmptyCart();
    CartManager.setCartItems(cart);
    return cart;
  }

  static getEmptyCart(): Cart {
    return {
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
      updatedAt: new Date().toLocaleDateString(),
    };
  }

  private static validateAndCalculateCart(cart: Cart): Cart {
    const totalPrice = cart.items.reduce((acc, current) => acc + current.price, 0);
    const totalQuantity = cart.items.reduce((acc, current) => acc + current.quantity, 0);

    const updatedCart: Cart = {
      ...cart,
      totalPrice,
      totalQuantity,
      updatedAt: new Date().toLocaleDateString(),
    };

    return updatedCart;
  }
}
