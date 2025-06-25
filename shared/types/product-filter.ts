export type Category = 'electronics' | 'clothing' | 'books';
export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export interface ProductFilters {
  sort: string;
  category: string;
}

export interface FilterOption<T> {
  value: T;
  label: string;
}
