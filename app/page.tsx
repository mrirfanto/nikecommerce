import ProductGrid from "@/features/products/components/product-grid";
import { mockProducts } from "@/shared/config/mockData";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
      <div className="text-center py-12">
        <ProductGrid products={mockProducts} />
      </div>
    </div>
  );
}
