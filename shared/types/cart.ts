import { Product } from '@/shared/types/product';

export type CartItem = Omit<Product, 'description' | 'stock'> & {
  quantity: number;
};

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  updatedAt: string;
}
