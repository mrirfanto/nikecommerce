import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { mockProducts } from '@shared/config/mockData';
import { ProductCard } from '.';

describe('ProductCard', () => {
  it('should render accordingly', () => {
    const mockProduct = mockProducts[0];

    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });
});
