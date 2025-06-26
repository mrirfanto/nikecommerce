import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/shared/types/product';
import ProductPurchaseSection from './components/product-purchase-section';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-gray-900 text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.category}</p>
          </div>

          <ProductPurchaseSection productId={product.id} />

          <div className="border-t pt-6">
            <h3 className="text-gray-900 text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
