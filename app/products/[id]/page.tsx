import { notFound } from 'next/navigation';

import ProductDetail from '@features/products/components/product-detail';
import { mockProducts } from '@/shared/config/mockData';
import { Product } from '@/shared/types/product';

export async function generateStaticParams() {
  const productIds = ['1', '2', '3', '4', '5'];
  return productIds.map((id) => ({ id }));
}

async function getStaticProduct(id: string): Promise<Product | null> {
  const product = mockProducts.find((product) => product.id === id);

  if (product) return product;

  return null;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await getStaticProduct(id);

  if (!product) {
    return notFound();
  }

  return <ProductDetail product={product} />;
}
