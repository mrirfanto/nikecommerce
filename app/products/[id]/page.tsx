import { notFound } from 'next/navigation';

import ProductDetail from '@features/products/components/product-detail';
import { mockProducts } from '@/shared/config/mockData';
import { Product } from '@/shared/types/product';

async function getProduct(id: string): Promise<Product | null> {
  const product = mockProducts.find((product) => product.id === id);

  if (product) return product;

  return null;
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  return <ProductDetail product={product} />;
}
