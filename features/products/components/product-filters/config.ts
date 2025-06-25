import { Category, FilterOption, ProductFilters, SortOption } from '@/shared/types/product-filter';

export const defaultFilterValue: ProductFilters = {
  category: 'all',
  sort: 'name-asc',
};

export const sortOptions: FilterOption<SortOption>[] = [
  {
    label: 'Price: Low to High',
    value: 'price-asc',
  },
  {
    label: 'Price: High to Low',
    value: 'price-desc',
  },
  {
    label: 'Name: A to Z',
    value: 'name-asc',
  },
  {
    label: 'Name: Z to A',
    value: 'name-desc',
  },
];

export const categoryOptions: FilterOption<Category | 'all'>[] = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Books',
    value: 'books',
  },
  {
    label: 'Clothing',
    value: 'clothing',
  },
  {
    label: 'Electronics',
    value: 'electronics',
  },
];
