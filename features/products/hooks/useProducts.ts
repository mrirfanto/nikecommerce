'use client';

import { Product } from '@/shared/types/product';
import { useMemo, useState } from 'react';
import { defaultFilterValue } from '@features/products/config/filterValue';
import { applyFiltersAndSort } from '@features/products/utils';
import { ProductFilters } from '@/shared/types/product-filter';

interface UseProductsReturn {
  filters: ProductFilters;
  handleChangeFilter: (newFilter: ProductFilters) => void;
  products: Product[];
}

export function useProducts(initialProducts: Product[]): UseProductsReturn {
  const [filters, setFilters] = useState(defaultFilterValue);

  const filteredProducts = useMemo(() => {
    return applyFiltersAndSort({
      filters,
      products: initialProducts,
    });
  }, [filters, initialProducts]);

  const handleChangeFilter = (newFilter: ProductFilters) => {
    setFilters(newFilter);
  };

  return {
    filters,
    handleChangeFilter,
    products: filteredProducts,
  };
}
