'use client';

import { Product } from '@/shared/types/product';
import ProductFilters from '../product-filters';
import { defaultFilterValue } from '../product-filters/config';
import ProductGrid from '../product-grid';

interface ProductListClientProps {
  products: Product[];
}

export default function ProductListClient({ products }: ProductListClientProps) {
  const handleChangeFilter = () => {
    //TODO: handle filter change from custom hooks
  };

  return (
    <div>
      <ProductFilters filters={defaultFilterValue} onFilterChange={handleChangeFilter} />

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
