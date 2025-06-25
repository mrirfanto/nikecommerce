import { describe, expect, it } from 'vitest';
import { filterProductsByCategory, sortProducts } from '.';
import { Product } from '@/shared/types/product';

const mockProducts: Product[] = [
  {
    id: '101',
    name: 'Eco-Friendly Water Bottle',
    category: 'Outdoors',
    price: 18.5,
    description: 'Reusable stainless steel water bottle, keeps drinks cold for 24 hours.',
    imageUrl: 'https://placehold.co/400x300?text=Water+Bottle',
  },
  {
    id: '102',
    name: 'Yoga Mat',
    category: 'Fitness',
    price: 25.0,
    description: 'Non-slip yoga mat, perfect for all types of yoga and exercise routines.',
    imageUrl: 'https://placehold.co/400x300?text=Yoga+Mat',
  },
];

describe('filterProductsByCategory', () => {
  it('Should return the correct products', () => {
    expect(
      filterProductsByCategory({
        category: 'outdoors',
        products: mockProducts,
      }),
    ).toHaveLength(1);
  });

  it('Should return empty', () => {
    expect(
      filterProductsByCategory({
        category: 'sports',
        products: mockProducts,
      }),
    ).toHaveLength(0);
  });
});

describe('sortProducts', () => {
  it('should render name ascending', () => {
    const got = sortProducts({
      products: mockProducts,
      sortBy: 'name-asc',
    });

    expect(got[0].id).toEqual('101');
  });

  it('should render name descending', () => {
    const got = sortProducts({
      products: mockProducts,
      sortBy: 'name-desc',
    });

    expect(got[0].id).toEqual('102');
  });

  it('should render price ascending', () => {
    const got = sortProducts({
      products: mockProducts,
      sortBy: 'price-asc',
    });

    expect(got[0].id).toEqual('101');
  });

  it('should render price descending', () => {
    const got = sortProducts({
      products: mockProducts,
      sortBy: 'price-desc',
    });

    expect(got[1].id).toEqual('101');
  });
});
