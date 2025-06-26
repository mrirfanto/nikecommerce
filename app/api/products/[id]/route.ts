import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@shared/config/mockData';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { id } = params;

  const product = mockProducts.find((product) => product.id === id);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}
