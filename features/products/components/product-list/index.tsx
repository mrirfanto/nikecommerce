'use client';

import { Product } from '@/shared/types/product';
import ProductFilters from '@features/products/components/product-filters';
import ProductGrid from '@features/products/components/product-grid';
import { useProducts } from '@features/products/hooks/useProducts';

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
