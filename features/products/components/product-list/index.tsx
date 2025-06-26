'use client';

import { Product } from '@shared/types/product';
import { useProducts } from '@features/products/hooks/useProducts';

import ProductFilters from './components/product-filters';
import ProductGrid from './components/product-grid';

interface ProductListClientProps {
  initialProducts: Product[];
}

export default function ProductListClient({ initialProducts }: ProductListClientProps) {
  const { filters, handleChangeFilter, products } = useProducts(initialProducts);

  return (
    <div>
      <ProductFilters filters={filters} onFilterChange={handleChangeFilter} />

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
