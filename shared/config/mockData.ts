import { Product } from '@shared/types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    description:
      'High-quality wireless headphones with noise cancellation and long-lasting battery.',
    imageUrl: 'https://placehold.co/400x300?text=Wireless+Headphones',
    stock: 23,
  },
  {
    id: '2',
    name: 'Smartwatch',
    category: 'Electronics',
    price: 249.0,
    description:
      'Stay connected with this sleek and feature-rich smartwatch. Tracks fitness, heart rate, and notifications.',
    imageUrl: 'https://placehold.co/400x300?text=Smartwatch',
    stock: 12,
  },
  {
    id: '3',
    name: 'Classic T-Shirt',
    category: 'Clothing',
    price: 29.5,
    description:
      'Comfortable cotton t-shirt, perfect for everyday wear. Available in various colors.',
    imageUrl: 'https://placehold.co/400x300?text=Classic+T-Shirt',
    stock: 47,
  },
  {
    id: '4',
    name: 'Fiction Novel',
    category: 'Books',
    price: 15.99,
    description: 'An engaging tale of adventure and mystery. A must-read for book lovers.',
    imageUrl: 'https://placehold.co/400x300?text=Fiction+Novel',
    stock: 8,
  },
  {
    id: '5',
    name: 'Portable Bluetooth Speaker',
    category: 'Electronics',
    price: 75.0,
    description:
      'Compact and powerful speaker with rich sound and long battery life. Perfect for travel.',
    imageUrl: 'https://placehold.co/400x300?text=Bluetooth+Speaker',
    stock: 31,
  },
];

export const categories = ['All', 'Electronics', 'Clothing', 'Books'] as const;
