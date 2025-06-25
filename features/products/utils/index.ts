import { Product } from '@/shared/types/product';
import { ProductFilters } from '@/shared/types/product-filter';

export function filterProductsByCategory({
  category,
  products,
}: {
  category: string;
  products: Product[];
}): Product[] {
  if (category === 'all' || !category) {
    return products;
  }
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
}

export function sortProducts({
  products,
  sortBy,
}: {
  products: Product[];
  sortBy: string;
}): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
}

export function applyFiltersAndSort({
  filters,
  products,
}: {
  filters: ProductFilters;
  products: Product[];
}): Product[] {
  const filtered = filterProductsByCategory({ products, category: filters.category });
  return sortProducts({ products: filtered, sortBy: filters.sort });
}
