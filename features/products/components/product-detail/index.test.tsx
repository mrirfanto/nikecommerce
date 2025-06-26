import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProductDetail from '.';
import { Product } from '@/shared/types/product';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  category: 'Electronics',
  description: 'A test product for unit testing.',
  imageUrl: '/test-product.jpg',
  price: 99.99,
  stock: 10,
};

describe('ProductDetail', () => {
  it('Should render accordingly', () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A test product for unit testing.')).toBeInTheDocument();
  });
});
