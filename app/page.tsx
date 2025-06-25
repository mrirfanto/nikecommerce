import ProductListClient from '@/features/products/components/product-list';
import { mockProducts } from '@/shared/config/mockData';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
        <p className="text-gray-600">Discover our curated selection of high-quality products</p>
      </div>

      <ProductListClient products={mockProducts} />
    </div>
  );
}
