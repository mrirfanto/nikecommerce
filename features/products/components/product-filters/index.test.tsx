import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import ProductFilters from '.';
import { defaultFilterValue } from './config';

describe('ProductFilters', () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('Should render all filters', () => {
    render(<ProductFilters filters={defaultFilterValue} onFilterChange={mockOnFilterChange} />);

    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Sort By')).toBeInTheDocument();
  });

  it('Should update category filter', async () => {
    render(<ProductFilters filters={defaultFilterValue} onFilterChange={mockOnFilterChange} />);

    const filterCategory = screen.getByRole('combobox', {
      name: /category/i,
    });

    expect(filterCategory).toBeInTheDocument();
    const categoryOption = screen.getByRole('option', {
      name: /books/i,
    });

    await userEvent.selectOptions(filterCategory, categoryOption);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      category: 'books',
      sort: 'name-asc',
    });
  });

  it('Should update sort by filter', async () => {
    render(<ProductFilters filters={defaultFilterValue} onFilterChange={mockOnFilterChange} />);

    const filterSortBy = screen.getByRole('combobox', {
      name: /sort by/i,
    });

    expect(filterSortBy).toBeInTheDocument();
    const sortOption = screen.getByRole('option', {
      name: /Name: A to Z/i,
    });

    await userEvent.selectOptions(filterSortBy, sortOption);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      category: 'all',
      sort: 'name-asc',
    });
  });
});
