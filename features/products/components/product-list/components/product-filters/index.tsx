import { ProductFilters as FilterType } from '@/shared/types/product-filter';
import { ChangeEvent } from 'react';
import { categoryOptions, sortOptions } from './config';

interface ProductFiltersProps {
  filters: FilterType;
  onFilterChange: (filterType: FilterType) => void;
}

export default function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  const handleOnChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const filterType = e.target.id as keyof FilterType;
    const newFilterValue: FilterType = {
      ...filters,
    };

    newFilterValue[filterType] = e.target.value;

    onFilterChange(newFilterValue);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category Filter */}
        <div className="flex-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={handleOnChangeFilter}
            className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            name="category"
          >
            {categoryOptions.map((option) => (
              <option value={option.value} key={option.value} className="text-gray-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="flex-1">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sort"
            value={filters.sort}
            onChange={handleOnChangeFilter}
            className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            name="sort"
          >
            {sortOptions.map((option) => (
              <option value={option.value} key={option.value} className="text-gray-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
